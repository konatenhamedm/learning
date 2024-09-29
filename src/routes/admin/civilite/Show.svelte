<script lang="ts">
    import InputSimple from '$components/inputs/InputSimple.svelte';
	import { Button, Input, Label, Modal, Textarea } from 'flowbite-svelte';
	export let open: boolean = false; // modal control

	export let data: Record<string, string> = {};
	let code = "";
    let libelle = "";
  
   /*  alert(data?.name); */

   console.log(Object.keys(data))

	function init(form: HTMLFormElement) {
		if (data?.numeroEtatge) [data.first_name, data.last_name] = data.numeroEtatge.split(' ');
		code = data.code || ""; // Initialiser code avec la valeur de data
        libelle = data.libelle || ""; // Initialiser libelle avec la valeur de data
	}
</script>

<Modal
	bind:open
	title={Object.keys(data).length ? 'Détails ville' : 'Détails ville'}
	size="lg"
	class="m-4"
>
	<!-- Modal body -->
	<div class="space-y-6 p-0">
		<form action="#" use:init>
			<div class="grid grid-cols-6 gap-6">
				<InputSimple fieldName="code" label='Code' field={code} placeholder="entrez le code"/>
                <InputSimple fieldName="libelle" label='Libelle' field={libelle} placeholder="entrez le libelle"/>
			</div>
		</form>
	</div>

	<!-- Modal footer -->
	<div slot="footer" class="w-full">
		<div class="w-full grid grid-cols-3">
			<div class="col-span-2">

			</div>
			<div class="flex justify-end">
				<Button color='alternative' on:click = {() => (open = false)} type="submit">{'Fermer'}</Button>
			</div>
		</div>
	</div>
</Modal>