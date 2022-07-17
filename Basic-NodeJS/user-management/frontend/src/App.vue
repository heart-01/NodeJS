<template>
  <div id="app">
    <form style="padding: 24px;">
      First Name : <input type="text" v-model="form.firstname"><br><br>
      Last Name : <input type="text" v-model="form.lastname"><br><br>
      Age : <input type="text" v-model="form.age"><br><br>
      <button
        type="button"
        class="btn btn-primary"
        @click="add()">
        ADD
      </button>
      <button
        type="button"
        class="btn btn-secondary"
        @click="update()">
        UPDATE
      </button>
    </form>
    <table class="table">
      <thead>
        <tr>
          <th> First Name </th>
          <th> Last Name </th>
          <th> Age </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in items" :key="i">
          <td>
            {{ item.firstname }}
          </td>
          <td>
            {{ item.lastname }}
          </td>
          <td>
            {{ item.age }}
          </td>
          <td>
            <button
              type="button"
              style="margin-right: 20px;"
              class="btn btn-dark"
              @click="set(item)">
              Set
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="remove(item.id)">
              delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      form: {
        firstname: '',
        lastname: '',
        age: null
      },
      items: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    setDefault () {
      this.form = {
        id: null,
        firstname: '',
        lastname: '',
        age: null
      }
    },
    // สร้าง function เพื่อ map ตัวแปรจากฝั่ง server ที่เป็น camaleCase เป็น lowerCase ในฝั่งหน้า frontend
    mapUsers(users){
      return users.map((user) => ({
        id: user._id,
        firstname: user.firstName,
        lastname: user.lastName,
        age: user.age
      }))
    },
    async getData () {
      const { data } = await axios.get('http://localhost:2001/api/user')
      this.items = this.mapUsers(data.data)
    },
    async add () {
      await axios.post('http://localhost:2001/api/user', {
        first_name: this.form.firstname,
        last_name: this.form.lastname,
        age: Number(this.form.age)
      })
      this.getData()
      this.setDefault()
      alert('Create Success!!')
    },
    async remove (id) {
      await axios.delete(`http://localhost:2001/api/user/${id}`)
      this.getData()
      alert('Delete Success!!!')
    },
    set (item) {
      this.form = {
        id: item.id,
        firstname: item.firstname,
        lastname: item.lastname,
        age: item.age
      }
    },
    async update () {
      await axios.put(`http://localhost:2001/api/user/${this.form.id}`, {
        id: this.form.id,
        first_name: this.form.firstname,
        last_name: this.form.lastname,
        age: Number(this.form.age)
      })
      this.getData()
      this.setDefault()
      alert('Update Success!!!')
    }
  }
}
</script>
