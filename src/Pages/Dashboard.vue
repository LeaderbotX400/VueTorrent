<script setup lang="ts">
import { useMainData } from '@/composables/api/info'
import { definePage } from 'vue-router/auto'
import { computed, ref } from 'vue'
import type { Torrent } from '@/models'
import { isProduction } from '@/utils'
import { generateMultiple } from '@/utils/faker/faker'
import torrent from '@/components/Torrent/Torrent.vue'
import { useWebUISettingsStore } from '@/stores/settings'
import { useDisplay } from 'vuetify'

definePage({
  path: '/dashboard',
  name: 'Dashboard'
})

// Data
const pageNumber = ref(1)

// Composables
const mainData = useMainData()
const settings = useWebUISettingsStore()
const { height } = useDisplay()

// Computed
const torrents = computed(() => {
  return Object.values(mainData.data.value?.torrents ?? {})
  // if (isProduction()) return torrents
  // if (import.meta.env.VITE_USE_FAKE_TORRENTS === false) return torrents
  // const count = import.meta.env.VITE_FAKE_TORRENT_COUNT
  // _torrents.push(...generateMultiple(count))
})


// Methods
const pageCount = () => {
  const l = Number(mainData.data.value?.torrents?.length ?? 0)
  const s = settings.webUISettings.paginationSize

  return Math.ceil(l / s)
}
</script>

<template>
  <div v-if="torrents.length === 0" class="mt-5 text-xs-center">
    <p class="grey--text">{{ $t('dashboard.emptyTorrentList') }}</p>
  </div>
  <div v-else>
    <VList class="pa-0 transparent">
      <VVirtualScroll :items="torrents" :height="height">
        <template #default="{ item }">
          <VListItem class="px-0">
            <VCard :class="'sideborder ' + item.state">
              <torrent :torrent="item" />
            </VCard>
          </VListItem>
        </template>
      </VVirtualScroll>
    </VList>
  </div>
</template>
