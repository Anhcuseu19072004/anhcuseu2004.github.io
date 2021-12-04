from quizi.models import *

# check question is correct
def check_question(id, answer):
    question = Question.objects.get(pk = int(id))
    if question.correct_answer == answer:
        return True
    else:
        return False

def handles_check_question(mylist, info_user, id_exam):
    total_question    = len(mylist)
    list_wrong_answer = []

    for i in mylist:
        # print(i)
        if not check_question(i['id_question'], i['answer_select']):
            list_wrong_answer.append(i['id_question'])
    
    if len(list_wrong_answer) == 0:
        x = 'none'
    else:
        x = "-".join(list_wrong_answer)

    user       = User.objects.get(pk = info_user)
    exam       = Exam.objects.get(pk = int(id_exam))
    exam.number_of_times += 1
    exam.save()
    new_result = Result(
        result_of_user    = user,
        result_of_exam    = exam,
        list_answer_wrong = x,
        total_answer      = len(mylist)
    )

    new_result.save()
    return new_result.pk

# ============ Work with models =============
def get_list_question(list_id):
    list_question = []
    for i in list_id:
        list_question.append(Question.objects.get(pk = i))
    return list_question