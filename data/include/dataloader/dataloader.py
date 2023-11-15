import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import heapq


# csv 파일 로드
def load_data(filename):
    file_path = f'./include/dataset/{filename}'
    return pd.read_csv(file_path)


# 파일 로드, 공통 컬럼으로 합치기
def data_preprocessing():
    # 공부 카테고리는 따로 csv로드
    life_quotes = load_data('life_quotes.csv')
    file_paths = ['place.csv', 'show.csv', 'sports.csv', 'restaurant.csv']
    data_frames = [load_data(file_path) for file_path in file_paths]

    merged_data = pd.concat(data_frames, ignore_index=True)
    # 데이터 병합
    selected_data = merged_data[['title', 'info', 'category', 'categoryName']]

    # 공부 카테고리는 따로 행 추가
    new_row = pd.DataFrame({'title': ['명언'], 'info': ['시험, 면접, 테스트, 자격증'], 'category': ['공부'],
                            'categoryName': ['명상 요가 자기계발 자기개발 학습']})

    selected_data = pd.concat([selected_data, new_row], ignore_index=True)

    return merged_data, selected_data, life_quotes


# 존재하는 모든 csv파일에 있는 아이템간 유사도 계산해서 파일로 저장
def save_item_similarity():
    file_paths = ['place.csv', 'show.csv', 'sports.csv', 'restaurant.csv']
    data_frames = [load_data(file_path) for file_path in file_paths]
    merged_data = pd.concat(data_frames, ignore_index=True)
    # 데이터 병합
    selected_data = merged_data[['title', 'info', 'category', 'categoryName']]

    # # 텍스트 벡터화
    tfidf_vectorizer = TfidfVectorizer()

    tfidf_matrix = tfidf_vectorizer.fit_transform(selected_data.apply(lambda x: ' '.join(x), axis=1))

    # 새로 생성할 파일
    result_df = pd.DataFrame()

    for idx, row in selected_data.iterrows():
        target_string = ''
        target_string += row['title'] + ' ' + row['info'] + ' ' + row['category'] + ' ' + row['categoryName']
        target_list = [target_string]
        target_matrix = tfidf_vectorizer.transform(target_list)

        cosine_similarities = cosine_similarity(target_matrix, tfidf_matrix)
        # 자기 자신은 제외
        cosine_similarities[0][idx] = -1

        top_10_indices = heapq.nlargest(12, range(len(cosine_similarities[0])), cosine_similarities[0].take)
        # 상위 10개 아이템의 인덱스와 유사도 저장
        top_10_items_with_similarity = [(index, cosine_similarities[0][index]) for index in top_10_indices]

        # 인덱스를 이용하여 상위 10개 아이템 출력
        top_10_items = selected_data.iloc[top_10_indices]
        target_title = row['title']
        # 쉼표로 구별
        top_titles = ', '.join(top_10_items['title'].tolist())
        # 결과 데이터프레임에 저장
        result_df = pd.concat([result_df, pd.DataFrame({'targetTitle': target_title,
                                                        'targetIndex': idx,
                                                        'topTitle': [top_titles],
                                                        'similarity': [top_10_items_with_similarity]})], ignore_index=True)

    # 파일 저장
    result_df.to_csv('./include/dataset/top_similarity_results.csv', index=False)
