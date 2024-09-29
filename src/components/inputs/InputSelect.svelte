<script lang="ts">
    type Select = {
        id:number,
        libelle:string
    }
export let label;
export let datas: Select[] = [];
export let id;
export let selectedId : number ;
</script>


<div class="w-full max-w-xs mx-auto">
    <label for="{id}" class="block mb-2 text-sm font-medium text-gray-900">{label}</label>
    <select id="{id}" bind:value={selectedId} class="select2 w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block">
     {#each datas as data }
        <option  value="{data.id}"  >{data.libelle}</option>
     {/each}
     
        <!-- <option value="AF">Afghanistan</option>
      <option value="DZ">Algeria</option>
      <option value="AO">Angola</option>
      <option value="AR">Argentina</option> -->
      <!-- Autres options -->
    </select>
  </div>

  <p>voici la valeur selectionner : {selectedId}</p>