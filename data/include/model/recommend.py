import ast
from include.dataloader.dataloader import data_preprocessing, load_data
from sklearn.feature_extraction.text import TfidfVectorizer

from sklearn.metrics.pairwise import cosine_similarity


# 0.1 이상 유사한 아이템이 20개 이하.
def handle_few_similarity(top_indices):
    # 아이템 유사도 계산한 파일
    top_similarity = load_data('top_similarity_results.csv')

    indices_to_select = [index for index, _ in top_indices]
    # 인덱스에 해당하는 행을 선택
    selected_rows = top_similarity.loc[indices_to_select]

    # topIndex 컬럼 값들만 리스트로 변환
    target_titles = selected_rows['similarity'].tolist()

    # 특수문자 제거
    list_of_tuples = ast.literal_eval(target_titles[0])

    # indices_to_select에 있는 인덱스는 포함하지 않음
    filtered_list = [index for index in list_of_tuples if all(index[0] != idx for idx in indices_to_select)]

    sorted_list_of_tuples = sorted(filtered_list, key=lambda x: x[1], reverse=True)

    return sorted_list_of_tuples


def transform_json(life_quotes, top_similarities, selected_data, origin_data):
    result = []

    travel_keys = ['category', 'title', 'info', 'roadAddress', 'lotNumberAddress', 'categoryName', 'homepage', 'image']
    show_keys = ['title', 'openDate', 'finalDate', 'info', 'image', 'categoryName', 'category']
    sport_keys = ['league', 'gameDate', 'gameDateTime', 'homeTeamName', 'homeTeamScore', 'awayTeamName',
                  'awayTeamScore', 'winner', 'statusCode', 'statusInfo', 'cancel', 'suspended', 'reversedHomeAway',
                  'homeTeamEmblemUrl', 'awayTeamEmblemUrl', 'title', 'info', 'category', 'categoryName']
    study_keys = ['author', 'maxim', 'category']
    # 공부 카테고리는 명언 랜덤 하나 뽑기
    random_study = life_quotes.sample(n=1)
    for idx, similarity in top_similarities:
        if selected_data.loc[idx, "category"] == "여행" or selected_data.loc[idx, "category"] == "맛집":
            result.append(origin_data.loc[idx, travel_keys].to_dict())
        elif selected_data.loc[idx, "category"] == "공연 전시":
            result.append(origin_data.loc[idx, show_keys].to_dict())
        elif selected_data.loc[idx, "category"] == "스포츠":
            result.append(origin_data.loc[idx, sport_keys].to_dict())
        elif selected_data.loc[idx, "category"] == "공부":
            result.append(random_study[study_keys].to_dict(orient='records')[0])

    return result


def calcultation_similarity(summary_list):
    original_json = []

    origin_data, selected_data, life_quotes = data_preprocessing()

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
    filtered_indices = [(index, similarity) for index, similarity in similarities_with_target if similarity > 0.05]
    # 유사도 높은 순으로 정렬
    top_indices = sorted(filtered_indices, key=lambda x: x[1], reverse=True)

    if len(top_indices) > 20:
        top_indices = top_indices[:40]
    # json으로 반환
    original_json = transform_json(life_quotes, top_indices, selected_data, origin_data)

    top_indices = [item for item in top_indices if item[0] != 2487]

    # 유사한 아이템이 없는 경우

    if len(top_indices) == 0:
        return original_json

    # 유사한 아이템이 1개 이상 20개 미만일 경우
    elif len(top_indices) < 20:
        sorted_list_of_tuples = handle_few_similarity(top_indices)

        new_json = transform_json(life_quotes, sorted_list_of_tuples, selected_data, origin_data)

        original_json.extend(new_json)
        return original_json

    # 유사한 아이템이 충분한 경우
    else:
        return original_json
