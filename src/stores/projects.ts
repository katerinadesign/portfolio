import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Project } from '@/types/project'
import { projects as mockProjects } from '@/data/projects'

/**
 * Store с данными проектов портфолио.
 * Сейчас источник — моковый файл, но интерфейс store позволяет
 * позже заменить его на загрузку с бэкенда без изменения компонентов.
 */
export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>(mockProjects)

  const projectCount = computed(() => projects.value.length)

  function getProjectBySlug(slug: string): Project | undefined {
    return projects.value.find((project) => project.slug === slug)
  }

  return { projects, projectCount, getProjectBySlug }
})
