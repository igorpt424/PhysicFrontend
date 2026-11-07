<template>
    <div class="w-full h-full flex items-center justify-center">
        <div class="w-full h-full flex items-center justify-center" v-if="!start">
            <div class="bg-[#000036] p-50 rounded-3xl flex flex-col gap-5">
                <p class="text-2xl text-white font-semibold w-300">Введите пароль админа: </p>
                <input type="password" class="bg-white p-2 rounded-2xl" v-model="adminCode">
                <button class="font-['Inter'] text-3xl w-[300px] h-[50px] bg-[#FEE67C] text-[#8F52A0] rounded-4xl hover:bg-[#FFE15E]" @click="checkStart">Проверить</button>
                <p class="text-2xl text-red-600 font-semibold">{{ err }}</p>
            </div>
        </div>
        <div class="w-full h-full flex items-center justify-center" v-if="displayTasks">
            <div class="bg-[#000036] p-50 rounded-3xl flex flex-col gap-5">
                <p class="text-2xl text-white font-semibold w-300">Текст: {{ taskList[taskNumber].text }}</p>
                <p class="text-2xl text-white font-semibold w-300">Подсказка: {{ taskList[taskNumber].hint }}</p>
                <p class="text-2xl text-white font-semibold w-300">Ответ: {{ taskList[taskNumber].answer }}</p>
                <p class="text-2xl text-white font-semibold w-300">Тема: {{ taskList[taskNumber].topicName }}</p>
                <div class="flex gap-5">
                    <button @click="listMin" v-if="taskNumber != 0">⬅️</button>
                    <button class="text-2xl w-[150px] h-[50px] bg-[#ca0e0e] text-white rounded-4xl" @click="deleteTask">Удалить</button>
                    <button class="text-2xl w-[150px] h-[50px] bg-[#0ecaca] text-white rounded-4xl" @click="swapToClient">Создать</button>
                    <button class="text-2xl w-[150px] h-[50px] bg-[#c7ca0e] text-white rounded-4xl" @click="swapToEdit">Изменить</button>
                    <button @click="listPlass" v-if="taskNumber != taskCount">➡️</button>
                </div>
                <p class="text-2xl text-white font-semibold w-300">После удаления задачи обновите стараницу и введите заново пароль админа</p>
                <button class="font-['Inter'] text-3xl w-[300px] h-[50px] bg-[#FEE67C] text-[#8F52A0] rounded-4xl hover:bg-[#FFE15E]" @click="swapToTopics">Посмотреть темы</button>
            </div>
        </div>
        <div class="w-full h-full flex items-center justify-center" v-if="displayCreate">
            <div class="bg-[#000036] p-50 rounded-3xl flex flex-col gap-5">
                <div>
                    <p class="text-2xl text-white font-semibold w-300 mb-3">Введите текст задачи: </p>
                    <input type="text" v-model="text" class="bg-white p-2 rounded-2xl ml-10">
                </div>
                <div>
                    <p class="text-2xl text-white font-semibold w-300 mb-3">Введите подсказку: </p>
                    <input type="text" v-model="hint" class="bg-white p-2 rounded-2xl ml-10">
                </div>
                <div>
                    <p class="text-2xl text-white font-semibold w-300 mb-3">Введите ответ задачи: </p>
                    <input type="text" v-model="answer" class="bg-white p-2 rounded-2xl ml-10">
                </div>
                <div>
                    <p class="text-2xl text-white font-semibold w-300 mb-3">Выберите тему задачи: </p>
                    <select v-model="selectedTopic"  class="bg-white w-50 p-[10px] rounded-2xl ml-10 mb-3" id="topic">
                        <option v-for="item in topics">{{ item.topic }}</option>
                    </select>
                </div>
                <button class="text-2xl w-[150px] h-[50px] bg-[#0ecaca] text-white rounded-4xl" @click="createTask">Создать</button>
                <p class="text-2xl text-white font-semibold w-300">После создания задачи обновите стараницу и введите заново пароль админа</p>
            </div>
        </div>
        <div class="w-full h-full flex items-center justify-center" v-if="displayEdit">
            <div class="bg-[#000036] p-50 rounded-3xl flex flex-col gap-5">
                <div>
                    <p class="text-2xl text-white font-semibold w-300 mb-3">Введите текст задачи: </p>
                    <input type="text" v-model="Edittext" class="bg-white p-2 rounded-2xl ml-10">
                </div>
                <div>
                    <p class="text-2xl text-white font-semibold w-300 mb-3">Введите подсказку: </p>
                    <input type="text" v-model="Edithint" class="bg-white p-2 rounded-2xl ml-10">
                </div>
                <div>
                    <p class="text-2xl text-white font-semibold w-300 mb-3">Введите ответ задачи: </p>
                    <input type="text" v-model="Editanswer" class="bg-white p-2 rounded-2xl ml-10">
                </div>
                <div>
                    <p class="text-2xl text-white font-semibold w-300 mb-3">Выберите тему задачи: </p>
                    <select v-model="EditselectedTopic"  class="bg-white w-50 p-[10px] rounded-2xl ml-10 mb-3" id="topic">
                        <option v-for="item in topics">{{ item.topic }}</option>
                    </select>
                </div>
                <button class="text-2xl w-[150px] h-[50px] bg-[#c7ca0e] text-white rounded-4xl" @click="editTask">Изменить</button>
                <p class="text-2xl text-white font-semibold w-300">После изменения задачи обновите стараницу и введите заново пароль админа</p>
            </div>
        </div>
        <div class="w-full h-full flex items-center justify-center" v-if="displayTopic">
            <div class="bg-[#000036] p-50 rounded-3xl flex flex-col gap-5">
                <p class="text-2xl text-white font-semibold w-300">{{ topics[TopicNumber].topic }}</p>
                <div class="flex gap-5">
                    <button @click="listMinTopic" v-if="TopicNumber != 0">⬅️</button>
                    <button @click="listPlassTopic" v-if="TopicNumber != TopicCount">➡️</button>
                </div>
                <div class="flex gap-7">
                    <input type="text" v-model="createTopic" class="bg-white p-2 rounded-2xl ml-10">
                    <button class="text-2xl w-[150px] h-[50px] bg-[#0ecaca] text-white rounded-4xl" @click="createtopic">Создать</button>
                </div>
                <button class="text-2xl w-[150px] h-[50px] bg-[#ca0e0e] text-white rounded-4xl" @click="deletetopic">Удалить</button>
                <p class="text-2xl text-white font-semibold w-300">После удаления или создания темы обновите страницу</p>
                <p class="text-2xl text-white font-semibold w-300">Не создавайте тем, которые уже есть, они не добавятся!</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const err = ref('')
const topics = await $fetch("http://localhost:7000/task/allTopics")
const taskList = ref()

const start = ref(false)
const adminCode = ref('')

const displayTasks = ref(false)
const taskNumber = ref(0)
const taskCount = ref()

const displayCreate = ref(false)
const text = ref('')
const hint = ref('')
const answer = ref('')
const selectedTopic = ref(null)

const displayEdit = ref(false)
const Edittext = ref('')
const Edithint = ref('')
const Editanswer = ref('')
const EditselectedTopic = ref(null)

const displayTopic = ref(false)
const TopicNumber = ref(0)
const TopicCount = ref(topics.length - 1)
const createTopic = ref('')

async function checkStart(){
    try{
        const response = await $fetch("http://localhost:7000/task/all/admin", {
            method: 'POST',
            headers: {
                'adminCode': adminCode.value
            }
        })
        taskList.value = response
        taskCount.value = taskList.value.length - 1
        displayTasks.value = true
        start.value = true
    } catch{
        err.value = "Неправильный пароль админа"
    }
}
function listPlass(){
    taskNumber.value += 1
}
function listMin(){
    taskNumber.value -=1
}
async function deleteTask() {
    try{
    const response = await $fetch('http://localhost:7000/task/delete', {
        method: 'DELETE',
        headers:{
            'adminCode': adminCode.value
        },
        body:{
            'taskId': taskList.value[taskNumber.value].id
        }
    })
    } catch {
        err.value = 'Что-то пошло не так'
    }
}
function swapToClient(){
    displayTasks.value = false
    displayCreate.value = true
}
async function createTask() {
        const response = await $fetch('http://localhost:7000/task/create',{
            method: 'POST',
            headers:{
                'adminCode': adminCode.value
            },
            body:{
                'text': text.value,
                'answer': answer.value,
                'hint': hint.value,
                'topicId': selectedTopic.value
            }
        })
            displayTasks.value = true
            displayCreate.value = false
}
async function swapToEdit() {
    displayTasks.value = false
    Edittext.value = taskList.value[taskNumber.value].text
    Edithint.value = taskList.value[taskNumber.value].hint
    Editanswer.value = taskList.value[taskNumber.value].answer
    EditselectedTopic.value = taskList.value[taskNumber.value].topicName
    displayEdit.value = true
}
async function editTask(){
    const response = await $fetch('http://localhost:7000/task/edit',{
        method: 'PATCH',
        headers:{
            'adminCode': adminCode.value
        },
        body:{
            'taskId':taskList.value[taskNumber.value].id,
            'text': Edittext.value,
            'answer': Editanswer.value,
            'hint': Edithint.value,
            'topicId': EditselectedTopic.value
        }
    })
    displayTasks.value = true
    displayEdit.value = false
}
function listPlassTopic(){
    TopicNumber.value += 1
}
function listMinTopic(){
    TopicNumber.value -=1
}
async function createtopic() {
    const response = await $fetch('http://localhost:7000/task/createTopic',{
        method: 'POST',
        headers:{
            'adminCode': adminCode.value
        },
        body:{
            'name': createTopic.value
        }
    })
}
async function deletetopic() {
    console.log(topics[TopicNumber.value].id)
    const response = await $fetch('http://localhost:7000/task/deleteTopic',{
        method: 'DELETE',
        headers:{
            'adminCode': adminCode.value
        },
        body:{
            'topicId': topics[TopicNumber.value].id
        }
    })
}
function swapToTopics(){
    displayTasks.value = false
    displayTopic.value = true
}
</script>