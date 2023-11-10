import json
from konlpy.tag import Okt
from include.dataloader.dataloader import data_preprocessing
from sklearn.feature_extraction.text import TfidfVectorizer

from sklearn.metrics.pairwise import cosine_similarity #유사도 산출


def get_morphemes(text):
    okt = Okt()
    morphemes = okt.morphs(text)
    return morphemes


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

    travel_keys = ['category', 'title', 'info', 'road_address', 'jibun_address', 'category_name', 'homepage', 'image']
    show_keys = ['title','opendate','finaldate','info','image','category_name','category']
    sport_keys = ['categoryName','gameDate','gameDateTime','homeTeamName','homeTeamScore','awayTeamName','awayTeamScore','winner','statusCode','statusInfo','cancel','suspended','reversedHomeAway','homeTeamEmblemUrl','awayTeamEmblemUrl','title','info','category','category_name']

    for idx, similarity in top_similarities:
        if selected_data.loc[idx, "category"] == "여행":
            result.append(origin_data.loc[idx, travel_keys].to_dict())
        elif selected_data.loc[idx, "category"] == "공연, 뮤지컬, 콘서트":
            result.append(origin_data.loc[idx, show_keys].to_dict())
        elif selected_data.loc[idx, "category"] == "스포츠":
            result.append(origin_data.loc[idx, sport_keys].to_dict())

    json_result = json.dumps(result, ensure_ascii=False, indent=4)

    return json_result


def calcultation_similarity_classification(summary_list):
    result = {"all": [],"travel": [], "show": [], "sport": []}

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

    travel_keys = ['category', 'title', 'info', 'road_address', 'jibun_address', 'category_name', 'homepage', 'image']
    show_keys = ['title','opendate','finaldate','info','image','category_name','category']
    sport_keys = ['categoryName','gameDate','gameDateTime','homeTeamName','homeTeamScore','awayTeamName','awayTeamScore','winner','statusCode','statusInfo','cancel','suspended','reversedHomeAway','homeTeamEmblemUrl','awayTeamEmblemUrl','title','info','category','category_name']

    for idx, similarity in top_similarities:
        category = selected_data.loc[idx, "category"]
        if category == "여행":
            result.setdefault("all", []).append(origin_data.loc[idx, travel_keys].to_dict())
            result.setdefault("travel", []).append(origin_data.loc[idx, travel_keys].to_dict())
        elif category == "공연, 뮤지컬, 콘서트":
            result.setdefault("all", []).append(origin_data.loc[idx, show_keys].to_dict())
            result.setdefault("show", []).append(origin_data.loc[idx, show_keys].to_dict())
        elif category == "스포츠":
            result.setdefault("all", []).append(origin_data.loc[idx, sport_keys].to_dict())
            result.setdefault("sport", []).append(origin_data.loc[idx, sport_keys].to_dict())

    json_result = json.dumps(result, ensure_ascii=False, indent=4)

    return json_result
