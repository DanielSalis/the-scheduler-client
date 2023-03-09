<template>
  <gContainer class="admin-user-page-container">
    <v-card>
      <v-toolbar
        flat
        color="white"
      >
        <v-toolbar-title>Usuários</v-toolbar-title>
      </v-toolbar>
      <v-tabs>
        <v-tab>
          <v-icon left>
            mdi-table
          </v-icon>
          Listar
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-plus
          </v-icon>
          Adicionar
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-download
          </v-icon>
          Exportar
        </v-tab>

        <v-tab-item v-if="usersData">
          <UsersList
            :headers="headers"
            :users="usersData"
          />
        </v-tab-item>
        <v-tab-item>
          <UsersAdd />
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <p>
                Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
              </p>

              <p class="mb-0">
                Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </gContainer>
</template>

<script>
  import gContainer from '~/components/g-container.vue';
  import UsersList from '~/components/users/users-list.vue';
  import UsersAdd from '~/components/users/users-add.vue';
  export default {
    name: 'AdminUserPage',
    components: {
      gContainer,
      UsersList,
      UsersAdd,
    },
    layout: 'admin',
    data () {
      return {
        search: '',
        usersData: null
      }
    },
    async fetch(){
      const usersResponse = await this.$axios.get('/user/getAll')
      this.usersData = usersResponse.data
    },
    computed: {
      headers(){
        const headerKeys = Object.keys(this.usersData[0])
        const headersData = headerKeys.map((item)=>{
          return {
            text: item.toUpperCase(),
            value: item
          }
        })
        headersData.push({ text: 'ACTIONS', value: 'actions', sortable: false },)
        return headersData
      }
    }
  }
</script>

<style lang="scss">
.admin-user-page-container{
  width: 100%;
  margin-top: 76px;
}
</style>