<template>
  <div>
    <VRow>
      <VCol sm="6" cols="12">
        <VCard title="Nueva Vista">
          <div
            class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row"
          >
            <div class="ma-auto pa-5 border-0">
              <VImg
                width="137"
                height="176"
                src="https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-1/assets/2-xjy_pXoW.png"
              >
              </VImg>
            </div>

            <div>
              <VCardItem>
                <VCardTitle>Apple Iphone 11 PRO</VCardTitle>
              </VCardItem>

              <VCardText
                >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
                hic sit, corporis, quia dolores debitis exercitationem, quidem
                eos magnam non optio repellat officia eveniet. Minus non sit
                iste commodi nihil!
              </VCardText>
            </div>
          </div>
        </VCard>
      </VCol>

      <VCol sm="6" cols="12">
        <VCard class="px-4 py-4">
          <VRow>
            <VCol cols="12">
              <VTextField label="Regular" placeholder="Regular"> </VTextField>
            </VCol>
            <VCol cols="12">
              <VTextarea label="Regular" placeholder="Regular"> </VTextarea>
            </VCol>
            <VCol cols="12">
              <VSelect
                :items="items"
                label="standard"
                placeholder="Select Item"
                eager=""
              ></VSelect>
            </VCol>
            <VCol cols="12">
              <VBtn color="primary">Primary</VBtn>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<script setup>
const items = ["vaca", "burro", "pollo", "Chancho"];
</script>
