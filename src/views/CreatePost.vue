<template>
  <div class="create">
    <form @submit.prevent="handleSubmit">
      <label>Title:</label>
      <input
        v-model="title"
        type="text"
        required
      >

      <label>Content:</label>
      <textarea
        v-model="body"
        require
      ></textarea>

      <label>Tags (hit enter to add a tag):</label>
      <input 
        @keydown.enter.prevent="handleKeydown" 
        v-model="tag" 
        type="text"
      >
      <div
        v-for="tag in tags"
        :key="tag"
        class="pill"
      >
        #{{ tag }}
      </div>
      <button>Add Post</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { projectFirestore, timestamp } from '../firebase/config'

export default {
  setup() {
    const title = ref('')
    const body = ref('')
    const tags = ref([])
    const tag = ref('')
    const router = useRouter()

    const handleKeydown = () => {
      if (!tags.value.includes(tag.value)) {
        tag.value = tag.value.replace(/\s/g,'')
        tags.value.push(tag.value)
      }
      tag.value = ''
    }

    const handleSubmit = async () => {
      const post = {
        title: title.value,
        body: body.value,
        tags: tags.value,
        createdAt: timestamp()
      }

      const res = await projectFirestore.collection('posts').add(post)

      router.push({ name: 'Home' })
    }

    return { body, title, tags, tag, handleKeydown, handleSubmit }
  },
}
</script>

<style>
.create form {
  max-width: 480px;
  margin: 0 auto;
  text-align: left;
}

.create input,
.create textarea {
  display: block;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #eee;
}

.create textarea {
  height: 160px;
  resize: none;
  overflow-y: scroll;
}

.create label {
  display: inline-block;
  margin-top: 30px;
  position: relative;
  font-size: 20px;
  color: #fff;
  margin-bottom: 10px;
}

.create label::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background: #ff8800;
  position: absolute;
  z-index: -1;
  padding-right: 40px;
  left: -30px;
  transform: rotateZ(-1.5deg);
}

.create button {
  display: block;
  margin-top: 30px;
  background: #ff8800;
  color: #fff;
  border: none;
  padding: 8px 16px;
  font-size: 18px;
  cursor: pointer;
}

.create .pill {
  display: inline-block;
  margin: 10px 10px 0 0;
  color: #444;
  background: #ddd;
  padding: 8px;
  border-radius: 6px;
  font-size: 14px;
}
</style>