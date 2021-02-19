<template>
  <div v-if="error">{{ error }}</div>
  <div
    v-if="post"
    class="post"
  >
    <h3>{{ post.title }}</h3>
    <p class="pre">{{ post.body }}</p>
    <button
      class="delete"
      @click="handleDelete"
    >Delete post</button>
  </div>
  <div v-else>
    <Spinner />
  </div>
</template>

<script>
import Spinner from '../components/Spinner'
import getPost from '../composables/getPost'
import { useRoute, useRouter } from 'vue-router'
import { projectFirestore } from '../firebase/config'

export default {

  components: {
    Spinner,
  },

  props: ['id'],
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const { error, post, load } = getPost(route.params.id)

    load()

    const handleDelete = async () => {
      await projectFirestore.collection('posts').doc(props.id).delete()
      router.push({ name: 'Home' })
    }

    return { error, post, handleDelete }
  },
}
</script>

<style>
.tags a {
  margin-right: 10px;
}
.post {
  max-width: 1200px;
  margin: 0 auto;
}
.post p {
  color: #444;
  line-height: 1.5em;
  margin-top: 40px;
}
.pre {
  white-space: pre-wrap;
}
button.delete {
  display: block;
  padding: 8px 16px;
  font-size: 18px;
  margin: 10px auto;
  background: #ff8800;
  border: none;
  color: #fff;
  cursor: pointer;
}
</style>