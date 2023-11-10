# 데이터 불러오기
import pandas as pd

def load_data(filename):
    file_path = f'./include/dataset/{filename}'
    df = pd.read_csv(file_path)
    return df