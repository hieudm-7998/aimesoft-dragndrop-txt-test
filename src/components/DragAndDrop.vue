<template>
  <div class="text-file-reader flex items-center justify-center h-full" @drop.prevent="onDrop"
    @dragenter.prevent="onDragEnter" @dragover.prevent="onDragOver" @dragleave.prevent="onDragLeave">
    <div
      class="drop-zone flex flex-col justify-center items-center p-5 w-full h-full border-dashed border-2 border-indigo-600"
      :class="{ 'drag-over': isDragging }">
      <div v-if="!words" class="text-center font-semibold">Drag a .txt file here</div>
      <div v-else class="flex flex-col">
        <p>
          <span v-for="(word, index) in words" :key="index"
            :class="{ 'bg-indigo-600 italic text-white': isRepeated(word) }">
            {{ word }}{{ index < words.length - 1 ? ' ' : '' }} </span>
        </p>
        <div v-if="wordCounts && wordCounts.length > 0" class="mt-5">
          <h1 class="font-semibold">Most repeated words:</h1>
          <div v-for="(count, index) in wordCounts" :key="index" class="mb-3">
            '{{ count.word }}': {{ count.count }} times.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parseTextFile, countWords } from './../utils/textFileHandler.js';

export default {
  name: 'DragAndDrop',
  data() {
    return {
      isDragging: false,
      words: null,
      wordCounts: null,
    };
  },
  methods: {
    onDrop(e) {
      this.isDragging = false;
      const file = e.dataTransfer.files[0];
      parseTextFile(file)
        .then((words) => {
          this.words = words;
          this.wordCounts = countWords(words);
        })
        .catch((error) => {
          this.words = null;
          this.wordCounts = null;
          alert(error);
        });
    },
    onDragEnter(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    onDragOver(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    onDragLeave() {
      this.isDragging = false;
    },
    isRepeated(word) {
      const count = this.wordCounts.find((c) => c.word.toLowerCase() === word.toLowerCase());
      return count && count.count > 1;
    },
  },
};
</script>

<style>
.drag-over {
  border-color: crimson !important;
}
</style>