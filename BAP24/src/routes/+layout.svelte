<script>
    import { getFlash } from "sveltekit-flash-message/client";
    import toast, { Toaster } from "svelte-french-toast"
    import { page } from "$app/stores";

    const flash = getFlash(page);
    $: if ($flash) {
        switch ($flash.type) {
            case "succes":
                toast.success($flash.message)
                break;
            case "error":
                toast.error($flash.message)
                break;
        }
    }

    
</script>
<Toaster />

<div>
    <slot />
</div>