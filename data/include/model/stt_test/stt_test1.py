#!/usr/bin/env python

# Copyright 2017 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Google Cloud Speech API sample application using the streaming API.
NOTE: This module requires the additional dependency `pyaudio`. To install
using pip:
    pip install pyaudio
Example usage:
    python transcribe_streaming_mic.py
"""

# [START speech_transcribe_streaming_mic]
from __future__ import division
from flask import Flask, request
import re
import sys

from google.cloud import speech
# from google.cloud.speech import enums
# from google.cloud.speech import types
import pyaudio
from six.moves import queue
import time
# Audio recording parameters
app = Flask(__name__)

RATE = 16000
CHUNK = int(RATE / 10)  # 100ms


class MicrophoneStream(object):
    """Opens a recording stream as a generator yielding the audio chunks."""
    def __init__(self, rate, chunk):
        self._rate = rate
        self._chunk = chunk

        # Create a thread-safe buffer of audio data
        self._buff = queue.Queue()
        self.closed = True

    def __enter__(self):
        self._audio_interface = pyaudio.PyAudio()
        self._audio_stream = self._audio_interface.open(
            format=pyaudio.paInt16,
            # The API currently only supports 1-channel (mono) audio
            # https://goo.gl/z757pE
            channels=1, rate=self._rate,
            input=True, frames_per_buffer=self._chunk,
            # Run the audio stream asynchronously to fill the buffer object.
            # This is necessary so that the input device's buffer doesn't
            # overflow while the calling thread makes network requests, etc.
            stream_callback=self._fill_buffer,
        )

        self.closed = False

        return self

    def __exit__(self, type, value, traceback):
        self._audio_stream.stop_stream()
        self._audio_stream.close()
        self.closed = True
        # Signal the generator to terminate so that the client's
        # streaming_recognize method will not block the process termination.
        self._buff.put(None)
        self._audio_interface.terminate()

    def _fill_buffer(self, in_data, frame_count, time_info, status_flags):
        """Continuously collect data from the audio stream, into the buffer."""
        self._buff.put(in_data)
        return None, pyaudio.paContinue

    def generator(self):
        while not self.closed:
            # Use a blocking get() to ensure there's at least one chunk of
            # data, and stop iteration if the chunk is None, indicating the
            # end of the audio stream.
            chunk = self._buff.get()
            if chunk is None:
                return
            data = [chunk]

            # Now consume whatever other data's still buffered.
            while True:
                try:
                    chunk = self._buff.get(block=False)
                    if chunk is None:
                        return
                    data.append(chunk)
                except queue.Empty:
                    break

            yield b''.join(data)


def listen_print_loop(responses):
    num_chars_printed = 0
    full_transcript = []
    start_time = time.time()

    for result in responses.results:
        # print('result---------------', result)
        if not result.alternatives:
            continue

        # Display the transcription of the top alternative.
        transcript = result.alternatives[0].transcript
        full_transcript.append(transcript)

        print('transcript', transcript)
        # Add the transcript to the full_transcript
        last_transcript = transcript

        # Display interim results, but with a carriage return at the end of the line, so subsequent lines will overwrite them.
        #
        # If the previous result was longer than this one, we need to print some extra spaces to overwrite the previous result
        overwrite_chars = ' ' * (num_chars_printed - len(transcript))

        if not result.is_final:
            sys.stdout.write(transcript + overwrite_chars + '\r')
            sys.stdout.flush()

            num_chars_printed = len(transcript)

            if time.time() - start_time >= 10:
                print("Exiting...")
                stream.closed = True  # 오디오 스트림 종료
                break
        else:
            sentence = transcript + overwrite_chars
            # print('sentence', sentence)
            full_transcript.append(sentence)

            # Exit recognition if any of the transcribed phrases could be one of our keywords.
            # if re.search(r'\b(나가기|quit)\b', transcript, re.I):
            #     print('Exiting..')
            #     break
        # 시간이 30초 이상 경과하면 스트림을 종료하고 반복문을 빠져나옴
        if time.time() - start_time >= 10:
            print("Exiting...")
            stream.closed = True  # 오디오 스트림 종료
            break



    return full_transcript



    # Print the full_transcript at the end of recognition
    # print("Full Transcript: " + full_transcript)


@app.route('/test/stt', methods=['POST'])
def main():
    global stream
    # See http://g.co/cloud/speech/docs/languages
    # for a list of supported languages.
    language_code = 'ko-KR'  # a BCP-47 language tag

    client = speech.SpeechClient()
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=RATE,
        language_code=language_code)
    streaming_config = speech.StreamingRecognitionConfig(
        config=config,
        # 말을 멈추거나 끝내면 더 이상 stt가 동작하지 않도록 설정
        # single_utterance=True,
        interim_results=True)

    start_time = time.time()
    # print(start_time)
    static_start_time = None

    with MicrophoneStream(RATE, CHUNK) as stream:
        audio_generator = stream.generator()
        requests = (speech.StreamingRecognizeRequest(audio_content=content)
                    for content in audio_generator)

        responses = client.streaming_recognize(streaming_config, requests)

        results = []

        for response in responses:
            # print('response-----------------------', response)
            result = listen_print_loop(response)
            if result:
                results.append(result)
            # results.append(result)

            if time.time() - start_time >= 10:
                print("Exiting...")
                break

            # 추가 코드: 20초가 경과하면 audio_generator를 중단
            if time.time() - start_time >= 10:
                stream.closed = True  # MicrophoneStream을 닫음
    print(results)
    # 중복된 결과 제거
    if results:
        # 가장 긴 요소 선택
        longest_result = max(results, key=lambda x: len(''.join(x)))
        return longest_result




if __name__ == '__main__':
    main()
# [END speech_transcribe_streaming_mic]