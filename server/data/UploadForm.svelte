<script>
  import Tailwindcss from "./Tailwindcss.svelte";
</script>

<style>

</style>

<form action="http://127.0.0.1:3000/upload" method="POST" enctype="multipart/form-data">
  <input type="file" name="file" />
  <input type="submit" value="Upload" />
</form>
