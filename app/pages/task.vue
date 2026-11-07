<template>
    <div class="w-full h-full flex items-center justify-center">
        <div class="bg-[#000036] p-50 rounded-3xl flex flex-col gap-5" v-if="start">
            <div class="flex gap-7 ">
                <p class="text-2xl text-white font-semibold">Для начала игры выберете тему по физике: </p>
                <select v-model="selectedTopic"  class="bg-white w-50 p-[10px] rounded-2xl" id="topic">
                    <option>Любая тема</option>
                    <option v-for="item in topics">{{ item.topic }}</option>
                </select>
            </div>
            <button class="font-['Inter'] text-3xl w-[300px] h-[50px] bg-[#FEE67C] text-[#8F52A0] rounded-4xl hover:bg-[#FFE15E]" @click="checkSelectedTopic">Начать игру</button>
            <p class="text-2xl text-red-600 font-semibold">{{ err }}</p>
        </div>
        <div class="w-full h-full flex items-center justify-center" v-if="selected">
            <div class="bg-[#000036] p-50 rounded-3xl flex flex-col gap-5">
                <p class="text-2xl text-white font-semibold w-300">{{ taskList[taskNumber].text }}</p>
                <div class=" flex gap-5">
                    <p class="text-2xl text-white font-semibold">Введите ответ: </p>
                    <input type="text" v-model="answer" class="bg-white p-2 rounded-2xl">
                </div>
                <button class="font-['Inter'] text-3xl w-[300px] h-[50px] bg-[#FEE67C] text-[#8F52A0] rounded-4xl hover:bg-[#FFE15E]" @click="checkAnswer">Отправить</button>
                <p class="text-2xl text-red-600 font-semibold">{{ err }}</p>
                <p class="text-2xl text-green-600 font-semibold">{{ greenText }}</p>
                <div class="flex gap-6">
                    <p class="text-2xl text-green-600 font-semibold">✅ Правильных: {{ correctAnswersCount }}</p>
                    <p class="text-2xl text-red-600 font-semibold">❌ Неправильных: {{ notCorrectAnswersCount }}</p>
                </div>
            </div>
        </div>
        <div class="w-full h-full flex items-center justify-center" v-if="displayingResult">
            <div class="bg-[#000036] p-50 rounded-3xl flex flex-col gap-5">
                <p class="text-2xl text-white font-semibold w-300">Ваш уровень:{{ result }}</p>
                <p class="text-2xl text-white font-semibold w-300">Тема: {{ selectedTopic }}</p>
                <p class="text-2xl text-green-600 font-semibold">✅ Правильных: {{ correctAnswersCount }}</p>
                <p class="text-2xl text-red-600 font-semibold">❌ Неправильных: {{ notCorrectAnswersCount }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { data: topics } = await $fetch("http://localhost:7000/task/allTopics")
const selectedTopic = ref(null)
const selected = ref(false)
const err = ref('')
const taskList = ref()
const answer = ref('')
const taskNumber = ref(0)
const taskCount = ref(0)
const greenText = ref()
const start = ref(true)

const correctAnswersCount = ref(0)
const notCorrectAnswersCount = ref(0)
const notCorrectFlag = ref(true)
const displayingResult = ref(false)
const result = ref(0)

async function checkSelectedTopic(){
    if(selectedTopic.value == null){
        err.value = "Выберите тему"
    } else{
        selected.value = true
        start.value = false
            try{
                const response = await $fetch('http://localhost:7000/task/all')
                taskList.value = response
                if (selectedTopic.value === "Любая тема") {
                    taskList.value = response
                } else {
                    taskList.value = response.filter(task => task.topicName === selectedTopic.value)
                }
                err.value = ''
                taskCount.value = taskList.value.length - 1
            } catch{
                err.value = "Извините, что-то пошло не так"
            }
    }
}
async function checkAnswer(){
    try{
        console.log(taskList.value[taskNumber.value].id)
        console.log(answer.value)
        const response = await $fetch('http://localhost:7000/task/checkanswer', {
            method: "POST",
            body:{
                'taskId': String(taskList.value[taskNumber.value].id),
                'answer': answer.value
            }
        })
            if(response == "Correct answer"){
                greenText.value = "Правильный ответ"
                if(!err.value){
                    correctAnswersCount.value += 1
                }
                setTimeout(() => {
                    greenText.value = ''
                    err.value = ''
                    notCorrectFlag.value = true
                    answer.value = ''
                }, 2000)
                if(taskCount.value == taskNumber.value){
                    result.value = Math.round((correctAnswersCount.value/(taskCount.value + 1)) * 10)
                    displayingResult.value = true
                    selected.value = false
                }else{
                    taskNumber.value += 1
                }
            } else{
                err.value = response
                if(notCorrectFlag.value){
                    notCorrectAnswersCount.value += 1
                    notCorrectFlag.value = false
                }
            }
            
    } catch{
        err.value = "Что-то пошло не так"
    }
}
</script>