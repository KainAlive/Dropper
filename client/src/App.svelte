<script>
  import Tailwindcss from "./Tailwindcss.svelte";
  import { onMount } from "svelte";
  import UploadForm from "./UploadForm.svelte";
  import Navbar from "./Navbar.svelte";

  let data = [];
  onMount(async () => {
    await fetchData("/data");
  });

  async function fetchData(url) {
    const response = await fetch(url);
    data = await response.json();
    console.log(data);
    return data;
  }
</script>

<style>
  div {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>

<Tailwindcss />
<main>
  <Navbar />
  {#each data as item}
    <div class="grid grid-rows-auto grid-cols-5 shadow">
      <h1 class="px-5 py-2 col-span-3 text-lg">{item.name}</h1>
      {#if item.filetype == 'File'}
        <a
          href={'/download/' + item.id}
          class="flex-auto bg-blue-500 hover:bg-blue-700 hover:no-underline
          text-white font-bold py-2 px-4 rounded">
          Download
        </a>
        <a
          href={'/delete/' + item.id}
          class="flex-auto bg-red-500 hover:bg-red-700 hover:no-underline
          text-white font-bold py-2 px-4 rounded">
          Delete
        </a>
      {:else}
        <button
          class="col-span-2 flex-auto bg-blue-500 hover:bg-blue-700 text-white
          font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
          Folders are not supported yet...
        </button>
      {/if}
    </div>
  {/each}
</main>
