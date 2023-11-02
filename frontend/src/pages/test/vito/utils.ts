import axios, { AxiosError } from "axios";

export const config: ConfigType = {
  use_diarization: true,
  diarization: { spk_count: 1 },
  use_multi_channel: false,
  use_itn: true,
  use_disfluency_filter: true,
  use_profanity_filter: false,
  use_paragraph_splitter: true,
  paragraph_splitter: { max: 50 },
};

export const transcribeFile = async (
  file: express.Multer.File,
  access_token: string | undefined
): Promise<string | undefined> => {
  const form = new FormData();
  form.append("config", JSON.stringify(config));
  form.append("file", fs.createReadStream(file.path));

  try {
    const response = await axios.post(`${API_BASE}/v1/transcribe`, form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `bearer ${access_token}`,
      },
    });
    if (response) {
      return response.data.id;
    }
  } catch (error: any) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    }
  }
};
