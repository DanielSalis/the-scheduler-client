<template>
  <v-card flat>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="users"
      sort-by="calories"
      class="elevation-1"
    >
      <template #item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template #no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
  export default {
    name: "UsersList",
    props: {
      headers: {
        required: true,
        type: Array
      },
      users: {
        required: true,
        type: Array
      }
    },
    data() {
      return {
        search: ''
      }
    },
    methods: {
      editItem () {
        this.$router.push('/')
      },

      deleteItem () {
        confirm("Certeza que deseja deletar?")
      },
    },
  }
</script>