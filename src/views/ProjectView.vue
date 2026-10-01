<script setup lang="ts">
import { computed } from 'vue'
import ProjectDetail from '@/components/ProjectDetail.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { useProjectsStore } from '@/stores/projects'

const props = defineProps<{ slug: string }>()

const store = useProjectsStore()
const project = computed(() => store.getProjectBySlug(props.slug))
</script>

<template>
  <ProjectDetail v-if="project" :project="project" />
  <NotFoundView v-else />
</template>
