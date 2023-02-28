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
      :search="search"
    />
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
    }
  }
</script>