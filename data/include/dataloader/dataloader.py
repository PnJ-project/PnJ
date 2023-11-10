# 데이터 불러오기
import pandas as pd

def load_data(filename):
    file_path = f'./include/dataset/{filename}'
    return pd.read_csv(file_path)


def data_preprocessing():
    file_paths = ['place.csv', 'show.csv', 'sports.csv']
    data_frames = [load_data(file_path) for file_path in file_paths]

    merged_data = pd.concat(data_frames, ignore_index=True)
    # 데이터 병합
    selected_data = merged_data[['title', 'info', 'category', 'category_name']]

    return merged_data, selected_data