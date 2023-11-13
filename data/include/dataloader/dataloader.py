# 데이터 불러오기
import pandas as pd

def load_data(filename):
    file_path = f'./include/dataset/{filename}'
    return pd.read_csv(file_path)


def data_preprocessing():
    # 공부 카테고리는 따로 csv로드
    life_quotes = load_data('life_quotes.csv')
    file_paths = ['place.csv', 'show.csv', 'sports.csv', 'restaurant.csv']
    data_frames = [load_data(file_path) for file_path in file_paths]

    merged_data = pd.concat(data_frames, ignore_index=True)
    # 데이터 병합
    selected_data = merged_data[['title', 'info', 'category', 'categoryName']]

    new_row = pd.DataFrame({'title': ['명언'], 'info': ['시험, 면접, 테스트, 자격증'], 'category': ['공부'],
                            'categoryName': ['명상, 요가, 자기계발']})

    selected_data = pd.concat([selected_data, new_row], ignore_index=True)

    return merged_data, selected_data, life_quotes