import json
from konlpy.tag import Okt
from include.dataloader.dataloader import load_data
from sklearn.feature_extraction.text import TfidfVectorizer

from sklearn.metrics.pairwise import cosine_similarity #유사도 산출


def get_morphemes(text):
    okt = Okt()
    morphemes = okt.morphs(text)
    return morphemes

def data_preprocessing():
    data_load = load_data('place_01.csv')

    selected_data = data_load[['title', 'info', 'category', 'category_name']]

    return data_load, selected_data

def calcultation_similarity(summary_list):
    result = []

    origin_data, selected_data = data_preprocessing()

    # TF-IDF Vectorizer 초기화
    tfidf_vectorizer = TfidfVectorizer()

    # 텍스트 벡터화
    tfidf_matrix = tfidf_vectorizer.fit_transform(selected_data.apply(lambda x: ' '.join(x), axis=1))

    # 타겟 데이터 벡터화
    target_matrix = tfidf_vectorizer.transform(summary_list)

    # 코사인 유사도 계산
    cosine_similarities = cosine_similarity(target_matrix, tfidf_matrix)

    # 결과 출력
    similarities_with_target = list(enumerate(cosine_similarities[0]))
    top_similarities = sorted(similarities_with_target, key=lambda x: x[1], reverse=True)[:20]

    for idx, similarity in top_similarities:
        # print("index",idx)
        result.append(origin_data.iloc[idx].tolist())
        print(f"유사도: {similarity}, 데이터: {selected_data.iloc[idx]}")

    keys = ["category", "title", "info", "road_address", "jibun_address", "category_name", "homepage", "image"]
    json_data = [dict(zip(keys, item)) for item in result]

    json_result = json.dumps(json_data, ensure_ascii=False, indent=4)

    return json_result


