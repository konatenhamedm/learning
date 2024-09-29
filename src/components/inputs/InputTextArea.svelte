<script>
    import { Button, Input, Label, Modal, Textarea } from 'flowbite-svelte';
export let label;
export let field = "";
export let fieldName;
export let rows = 4;
export let placeholder = "";

</script>
<Label class="col-span-6 space-y-2">
    <span>{label}</span>
    <Textarea
        id="{fieldName}" bind:value={field}
        rows="{rows}"
        class="bg-gray-50 outline-none dark:bg-gray-700"
        placeholder="{placeholder}"
    >
        
    </Textarea>
</Label>