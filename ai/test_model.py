import pandas as pd
import re
from sklearn.metrics.pairwise import cosine_similarity
from konlpy.tag import Okt
import numpy as np
import pickle
import random
okt = Okt()     

def morph_and_stopwords(s):
    token_ls = []
    s = re.sub('[^ A-Za-z0-9가-힣]+', '', s)
    tmp = okt.morphs(s, stem=True)
    stopwords= pd.read_csv('stopwords.txt', delimiter='\t')
    for token in tmp:
        if token not in list(stopwords['sword']):
            #내맘대로 바꿔주기
            if token == '남자' or token == '남편' or token=='아빠' or token == '아버지':
                token = '남성'
            elif token == '여자' or token == '와이프' or token =='엄마' or token == '어머니':
                token = '여성'
            elif token == '생리' or token == '생리통':
                token = '월경'
            token_ls.append(token)
    return token_ls  
        
def test_model(new_data):
    with open('trained_mtx.pkl','rb') as fr:
        trained_mtx = pickle.load(fr)
    with open('trained_tf.pkl', 'rb') as fr:
        trained_tf = pickle.load(fr)
    
    morph = morph_and_stopwords(new_data)
    # print(morph)
    tf_new_mtx = trained_tf.transform(morph)

    cosine_sim = cosine_similarity(trained_mtx, tf_new_mtx)
    similarity = []
    for sim in cosine_sim:
        similarity.append(np.sum(sim)/len(morph))
    similarity = list(enumerate(similarity))
    similarity = sorted(similarity, key=lambda x: x[1], reverse=True)
    
    #유사도가 모두 0인경우 빈 array return
    if similarity[0][1] == 0.0:
        return []
    
    #가장 유사한 3개의 function 받아옴 (같은 유사도인경우 3개더라도 더받아옴)
    saved_arr = []
    saved = 0
    saved_score= -1
    for idx in range(0,len(similarity)):
        if similarity[idx][1] < 0.02:
            break
        if saved < 3:
            saved_arr.append(similarity[idx])
            saved_score = similarity[idx][1]
            saved += 1
        else:
            if saved_score == similarity[idx][1]:
                saved_arr.append(similarity[idx])
                saved+=1
            else:
                break
    recommendation_indices = [idx[0] for idx in saved_arr]
    prob = [idx[1] for idx in saved_arr]
    # print(prob)
    if len(recommendation_indices) > 3:
        recommendation_indices = random.sample(recommendation_indices,3)
    return recommendation_indices

result = test_model("간 건강에 좋은 영양제 추천해주세요")
print(result)
