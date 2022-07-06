<!-- Crear un store con el modelo del recurso -->
<script lang="ts">
  import AceEditor from 'svelte-ace-editor'
  // const test = {
  //   id: "id",
  //   imageURI: 'dummy.png',
  //   creationDate: new Date(),
  //   updateDate: new Date(),
  //   documentVersion: 2,
  //   authorId: "authorId",
  //   name: "name",
  //   description: "description",
  //   type: "Actor",
  //   data: {
  //     strength: 200,
  //     life: 100,
  //     $created: "do smth",
  //   },
  // };
  import "brace/mode/python";
  import "brace/theme/tomorrow_night_blue";
  let text = "";
</script>
 
<AceEditor style="width: 20px"
  on:selectionChange={(obj) => console.log(obj.detail)}
  on:paste={(obj) => console.log(obj.detail)}
  on:input={(obj) => console.log(obj.detail)}
  on:focus={() => console.log('focus')}
  on:documentChange={(obj) => console.log(`document change : ${obj.detail}`)}
  on:cut={() => console.log('cut')}
  on:cursorChange={() => console.log('cursor change')}
  on:copy={() => console.log('copy')}
  on:init={(editor) => console.log(editor.detail)}
  on:commandKey={(obj) => console.log(obj.detail)}
  on:changeMode={(obj) => console.log(`change mode : ${obj.detail}`)}
  on:blur={() => console.log('blur')}
  width='50%'
  height='300px'
  lang="python"
  theme="tomorrow_night_blue"
  value={text} />

<style>
</style>