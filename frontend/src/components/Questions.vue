
<script setup lang="ts">
import IconRight from './icons/IconRight.vue';
import IconLeft from './icons/IconLeft.vue';
import IconLoading from './icons/IconLoading.vue';
import IconCicle from './icons/IconCicle.vue';
</script>

<template>
    <section class="box">

        <h1>Questionário</h1>

        <div class="finished" v-if="total_correct_answers != null">
            <IconCicle :total-percentage="total_correct_answers" />
            <button class="btn" v-on:click="reset()" style="margin: 20px auto; display: block;">
                <IconLeft /> Responder novamente
            </button>
        </div>


        <IconLoading v-show="loadding" />
        <div class="box-bottom" v-if="total_correct_answers == null && !loadding">
            <div class="percentage">
                <div class="bar">
                    <div class="complete" :style="{ width: (page / questions.length) * 100 + '%' }"></div>
                </div>
                <span>Página {{ page }} de {{ questions.length }}</span>
            </div>



            <div class="questions" v-for="(question, index) in questions" :key="index">
                <div class="question" v-show="index == page - 1">
                    <h2>Pergunta {{ index + 1 }}</h2>
                    <h3>{{ decodeURIComponent(question.question) }}</h3>
                    <div class="answers">
                        <ul>
                            <li v-for="(answer, index2) in question.answers" :key="index">

                                <input type="radio" :name="'answer-' + index" :id="'answer-' + index + '-' + index2"
                                    :value="answer" v-on:click="setAnswer(index, answer)">
                                <label :for="'answer-' + index + '-' + index2">
                                    {{ decodeURIComponent(answer) }}
                                </label>
                            </li>

                        </ul>
                        <div class="actions">

                            <button class="btn" v-if="page > 1" v-on:click="setPage(page - 1)">
                                <IconLeft /> Voltar
                            </button>
                            <button class="btn" v-if="page < questions.length" v-on:click="setPage(page + 1)">Avançar
                                <IconRight />
                            </button>
                            <button class="btn" v-if="page == questions.length" v-on:click="finish()">Finalizar
                                <IconRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600&display=swap');

.box {
    font-family: 'Open Sans', sans-serif;
    color: #e52729;
    background-color: #f5f1e5;
    padding: 15px;
    width: 75vw;
    margin: auto;
    border-radius: 10px;
    box-shadow: 0px 3px 3px -3px #000;
    max-width: 900px;
}

.btn {
    background-color: #e52729;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-weight: 700;
    margin-right: 5px;
    margin-left: 5px;
    cursor: pointer;
    box-shadow: 0px 3px 3px -3px #000;
    display: inline-flex;
    text-align: center;
    font-size: 15px;

}

.btn svg {
    position: relative;
    top: 2px;
}

.btn:active {
    box-shadow: none;
}

.actions {
    display: flex;
    margin-top: 25px;
    margin-bottom: 10px;
}


ul {
    list-style: none;
    padding-left: 10px;
}

ul li {
    margin: 10px;
}


.answers input {
    margin-right: 6px;
}

.percentage .bar {
    height: 10px;
    width: 100%;
    background: #d1d5db;
    margin: 10px 0px;
    display: block;
    border-radius: 5px;
    overflow: hidden;
}

.percentage .bar .complete {
    height: 100%;
    background: red;
    border-radius: 5px;
}

.percentage span {
    color: #959ea5;
}

.question h2 {
    color: red;
    font-size: 15px;
    font-weight: 600;
    margin-top: 14px;
    margin-bottom: 14px;
}


.question {
    color: black;
}

input[type="radio"] {
    accent-color: red;
    border: 2px solid white;
    box-shadow: 0 0 0 1px #ff0404;
    appearance: none;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    background-color: #fff;
}

input[type="radio"]:checked {
    background-color: red;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from "axios";

export default defineComponent({
    data() {
        return {
            loadding: false,
            page: 0,
            questions: [],
            answers: [],
            total_correct_answers: null,
        };
    },
    created() {
        this.getQuestions();
    },
    methods: {
        getQuestions() {
            this.loadding = true;
            axios
                .get("http://localhost:3000/api/questions/1")
                .then((res: any) => {
                    this.questions = res.data;
                    this.questions.map((q: any) => {
                        q["answers"] = [].concat(q.incorrect_answers, q.correct_answer);
                    })
                    this.page = Math.min(this.questions.length, 1);
                    this.loadding = false;

                })
                .catch((error) => {
                    this.loadding = false;
                    console.log(error);
                });
        },

        setPage(page: number) {
            this.page = Math.max(page, 0);
        },

        setAnswer(questionId: any, answer: any) {
            this.answers[questionId] = { questionId, answer }
        },

        reset() {
            this.answers = [];
            this.total_correct_answers = null;
            this.page = 1;
        },
        finish() {

            let total: any = this.answers.filter((answer) => {
                return this.questions[answer["questionId"]]["correct_answer"] == answer["answer"];
            }).length;
            this.total_correct_answers = Number((total / this.questions.length) * 100).toFixed(0);
        }
    }

});
</script>