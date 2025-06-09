<script setup>
//import data from "@/views/js/datatable";
const data = ref([])
import { onMounted, ref, watch } from "vue";


const headers = [
  { title: "ID", sortable: false, key: "id" },
  { title: "Role", key: "name" },
  { title: "Permisos", key: "permissions_pluck" },
  { title: "Fecha", key: "created_at" },
  { title: "OP", key: "action" },
];

const searchQuery = ref(null)
const staff_selected = ref(null)
const staff_selected_deleted = ref(null)
const isAddStaffDialogVisible = ref(false)
const isEditStaffDialogVisible = ref(false)
const isDeleteStaffDialogVisible = ref(false)

const list = async () => {
  const resp = await $api('/role?search=' + (searchQuery.value ? searchQuery.value : ''), {
    method: 'GET',

    onResponseError({ response }) {
      // console.log(response)

    }
  })
  //console.log(resp)
  data.value = resp.users.data
}

const editItem = (item) => {
  isEditStaffDialogVisible.value = true
  staff_selected.value = item
  // console.log(staff_selected)

}

const deleteItem = (item) => {
  isDeleteStaffDialogVisible.value = true
  staff_selected_deleted.value = item
}

onMounted(() => {
  list()
  //console.log(staff_selected.value)
})

watch(isEditStaffDialogVisible, (event) => {
  if (event == false) {
    staff_selected.value = null
  }
})

watch(isDeleteStaffDialogVisible, (event) => {
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
          <VTextField v-model="searchQuery" placeholder="Search Roles" style="inline-size: 300px" density="compact"
            class="me-3" @keyup.enter="list" />
        </div>

        <VSpacer />

        <div class="d-flex gap-x-4 align-center">
          <VBtn color="primary" prepend-icon="ri-add-line" @click="isAddStaffDialogVisible = !isAddStaffDialogVisible">
            Add Staffs
          </VBtn>
        </div>
      </VCardText>

      <VDataTable :headers="headers" :items="data" :items-per-page="5" class="text-now-wrap">
        <template #item.id="{ item }">
          <span class="text-h6">{{ item.id }}</span>
        </template>
        <template #item.permissions_pluck="{ item }">
          <ul>
            <li v-for="(permiso, index) in item.permissions_pluck" :key="index">
              {{ permiso }}
            </li>
          </ul>
        </template>

        <template #item.action="{ item }">
          <div class="d-flex gap-1">
            <IconBtn size="small" @click="editItem(item)">
              <VIcon icon="ri-pencil-line" />
            </IconBtn>
            <IconBtn size="small" @click="deleteItem(item)">
              <VIcon icon="ri-delete-bin-line" />
            </IconBtn>
          </div>
        </template>
      </VDataTable>
    <!--  <AddRolDialog v-model:is-dialog-visible="isAddStaffDialogVisible" @addRole="list()" />
      <EditRolDialog v-if="staff_selected" :rolSelected="staff_selected"
        v-model:is-dialog-visible="isEditStaffDialogVisible" @addRole="list()" />
      <DeleteRolDialog v-if="staff_selected_deleted" :rolSelected="staff_selected_deleted"
        v-model:is-dialog-visible="isDeleteStaffDialogVisible" @addRole="list()" /> -->
    </VCard>
  </div>
</template>
