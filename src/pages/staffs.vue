<script setup>
//import data from "@/views/js/datatable";
const data = ref([])
import { onMounted, ref, watch } from "vue";


const headers = [
  { title: "ID", sortable: false, key: "id" },
  { title: "Avatar", key: "imagen" },
  { title: "Nombre y Apellido", key: "full_name" },
  { title: "Documento", key: "document_full" },
  { title: "Rol", key: "rol_name" },
   { title: "Correo", key: "email" },
  { title: "Op", key: "action" },
]

const roles = ref([])

const avatarText=value=>{
  if(!value)
  return ''
const nameArray = value.split('.')
return  nameArray.map(word=>word.charAt(0).toUpperCase()).join('')
}

const searchQuery = ref(null)
const staff_selected = ref(null)
const staff_selected_deleted = ref(null)
const isAddStaffDialogVisible = ref(false)
const isEditRolDialogVisible = ref(false)
const isDeleteRolDialogVisible = ref(false)

const list = async () => {
  const resp = await $api('/staffs?search=' + (searchQuery.value ? searchQuery.value : ''), {
    method: 'GET',

    onResponseError({ response }) {
       console.log(response)

    }
  })
  //console.log(resp)
  data.value = resp.users.data;
  roles.value=resp.roles;
}

const addUser=(newUser)=>{
data.value.unshift(newUser)
}

const editItem = (item) => {
  isEditRolDialogVisible.value = true
  staff_selected.value = item
  // console.log(staff_selected)

}

const deleteItem = (item) => {
  isDeleteRolDialogVisible.value = true
  staff_selected_deleted.value = item
}

onMounted(() => {
  list()
  //console.log(staff_selected.value)
})

watch(isEditRolDialogVisible, (event) => {
  if (event == false) {
    staff_selected.value = null
  }
})

watch(isDeleteRolDialogVisible, (event) => {
  if (event == false) {
    staff_selected_deleted.value = null
  }
})

</script>

<template>
  <div>
    <VCard title="Staffs">
      <VCardText class="d-flex flex-wrap gap-4">
        <div class="d-flex align-center">
          <!-- ðŸ‘‰ Search  -->
          <VTextField v-model="searchQuery" placeholder="Search Staff" style="inline-size: 300px" density="compact"
            class="me-3" @keyup.enter="list" />
        </div>

        <VSpacer />

        <div class="d-flex gap-x-4 align-center">
          <VBtn color="primary" prepend-icon="ri-add-line" @click="isAddStaffDialogVisible = !isAddStaffDialogVisible">
            Add Roles
          </VBtn>
        </div>
      </VCardText>

      <!-- Datatable -->
       <VDataTable
    :headers="headers"
    :items="data"
    :items-per-page="5"
  >
    <!-- full name -->
    <template #item.imagen="{ item }">
      <div class="d-flex align-center">
        <VAvatar
          size="32"
          :color="item.avatar ? '' : 'primary'"
          :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
          :variant="!item.avatar ? 'tonal' : undefined"
        >
          <VImg
            v-if="item.avatar"
            :src="item.avatar"
          />
          <span v-else>{{ avatarText(item.full_name) }}</span>
        </VAvatar>
        <div class="d-flex flex-column ms-3">
          <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.fullName }}</span>
          <small>{{ item.post }}</small>
        </div>
      </div>
    </template>

        <template #item.document_full="{ item }">
      <div class="d-flex align-center">

        <div class="d-flex flex-column ms-3">
          <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.n_document }}</span>
          <small>{{ item.type_document }}</small>
        </div>
      </div>
    </template>
  </VDataTable>


     <AddStaffDialog v-if="roles.length>0" v-model:is-dialog-visible="isAddStaffDialogVisible" :roles="roles" @addRole="addUser" />
      <!--  <EditStaffDialog v-if="staff_selected" :rolSelected="staff_selected"
        v-model:is-dialog-visible="isEditRolDialogVisible" @addRole="list()" />
      <DeleteStaffDialog v-if="staff_selected_deleted" :rolSelected="staff_selected_deleted"
        v-model:is-dialog-visible="isDeleteRolDialogVisible" @addRole="list()" /> -->
    </VCard>
  </div>
</template>

