<script>
  import Tailwindcss from "./Tailwindcss.svelte";
</script>

<style>

</style>

<nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
  <div class="flex items-center flex-shrink-0 text-white mr-6">
    <span class="font-semibold text-xl tracking-tight">Dropper</span>
  </div>
  <div>
    <form action="/upload" method="POST" enctype="multipart/form-data">
      <label>
        <span
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
          rounded">
          Upload
        </span>
        <input
          type="file"
          name="file"
          class="hidden"
          onchange="form.submit()" />
      </label>
    </form>
  </div>
</nav>
