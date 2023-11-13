import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


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
                            'categoryName': ['명상, 요가, 자기계발, 자기개발']})

    selected_data = pd.concat([selected_data, new_row], ignore_index=True)

    return merged_data, selected_data, life_quotes


# 존재하는 모든 csv파일에 있는 아이템간 유사도 계산해서 파일로 저장
def save_item_similarity():
    file_paths = ['place.csv', 'show.csv', 'sports.csv', 'restaurant.csv']
    data_frames = [load_data(file_path) for file_path in file_paths]
    merged_data = pd.concat(data_frames, ignore_index=True)
    # 데이터 병합
    selected_data = merged_data[['title', 'info', 'category', 'categoryName']]
    tfidf_vectorizer = TfidfVectorizer()
    # 텍스트 벡터화
    tfidf_matrix = tfidf_vectorizer.fit_transform(selected_data.apply(lambda x: ' '.join(x), axis=1))


    # 아이템간 코사인 유사도 계산
    cosine_similarities = cosine_similarity(tfidf_matrix, tfidf_matrix)
    similarity_df = pd.DataFrame(cosine_similarities, columns=selected_data['title'].tolist(),
                                 index=selected_data['title'].tolist())


    similarity_df.to_csv('./include/dataset/item_similarity_top10.csv', index=False, header=True)

