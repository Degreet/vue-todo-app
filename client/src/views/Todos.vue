<template>
  <div class="todos">
    <h1>Todos</h1>
    <form @submit.prevent="createTodo" class="todos__add-block">
      <input v-model="newTodoTitle" placeholder="Todo title" type="text" class="validate">
      <button class="waves-effect waves-light btn">Add</button>
    </form>
    <p v-if="todosLoading" class="grey-text text-darken-1">Loading todos...</p>
    <p v-else-if="!todos.length" class="grey-text text-darken-1">No todos</p>
    <ul v-else class="todos__list">
      <li v-for="todo in todos" :key="todo.id" class="todos__item z-depth-1">
        <span>{{ todo.title }}</span>
        <button class="todos__item-remove-btn">&times;</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Todos',
  data: () => ({
    newTodoTitle: '',
    todosLoading: true,
    todos: [],
  }),
  methods: {
    async createTodo() {
      const title = this.newTodoTitle
      if (!title || !title.trim()) return

      try {
        const { data } = await axios.post(
          '/todos/create',
          { title: title.trim() },
          { headers: { Authorization: `Bearer ${this.$store.state.token}` } }
        )

        this.todos.unshift({ id: data.id, title: title.trim() })
        this.newTodoTitle = ''
      } catch (e) {
        console.error(e)
        window.M.toast({ html: e.response.data.error })
      }
    },
  },
  async mounted() {
    if (!this.$store.state.isAuth) this.$router.push('/login')

    try {
      const { data } = await axios.get(
        '/todos',
        { headers: { Authorization: `Bearer ${this.$store.state.token}` } }
      )

      this.todos = data.todos
      this.todosLoading = false
    } catch (e) {
      console.error(e)
      window.M.toast({ html: e.response.data.error })
    }
  },
}
</script>

<style lang="scss" scoped>
.todos {
  &__add-block {
    display: flex;
    gap: 20px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    list-style: none;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    padding: 10px;

    &-remove-btn {
      border: none;
      background: transparent;
      font-size: 18px;
      cursor: pointer;

      &:hover {
        color: red;
      }
    }
  }
}
</style>
