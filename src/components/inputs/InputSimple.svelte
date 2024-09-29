<script lang="ts">
    import { Button, Input, Label, Modal, Textarea } from 'flowbite-svelte';

export let label;
export let field = "";
export let fieldName;
export let placeholder="";
//export let requis == false ;
</script>

<Label class="col-span-6 space-y-2 sm:col-span-3">
    <span>{label}</span>
    <Input name="{fieldName}" bind:value={field} class="border outline-none" placeholder="{placeholder}"   />
</Label>