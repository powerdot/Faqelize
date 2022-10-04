<template>
  <div class="page">
    JSON dictionary is an array with questions and answers.
    <br />
    Here is example:
    <br />
    <div class="example">
      <div class="filename">public/dictionary.json</div>
      <code>
        [
        <br />
        &nbsp;&nbsp;{ id: "one", "q": "What is your name?", "a_text": "My name
        is
        {{ name }}" },
        <br />
        &nbsp;&nbsp;{ id: "two", "q": "What is your age?", "a_text": "I am
        {{ age }} years old" }
        <br />
        ]
      </code>
    </div>
    Also you can use html for answers:
    <br />
    <div class="example">
      <div class="filename">public/dictionary.json</div>
      <code>
        ...
        <br />
        { <br />
        &nbsp;&nbsp;"id": "three", <br />
        &nbsp;&nbsp;"q": "What is your name?", <br />
        &nbsp;&nbsp;"a_html": {<br />
        &nbsp;&nbsp;&nbsp;&nbsp;"html": "Here is my inline html answer!" <br />
        &nbsp;&nbsp;} <br />
        }
        <br />
        ...
      </code>
    </div>
    <br />
    And also you can open modal pages like that:
    <br />
    <div class="example">
      <div class="filename">public/dictionary.json</div>
      <code>
        ...
        <br />
        { <br />
        &nbsp;&nbsp;"id": "four", <br />
        &nbsp;&nbsp;"q": "What is your name?", <br />
        &nbsp;&nbsp;"a_page": {<br />
        &nbsp;&nbsp;&nbsp;&nbsp;"page": "ExampleAnswerPage", <br />
        &nbsp;&nbsp;&nbsp;&nbsp;"subText": "Here is short question description
        to define page content before opening." <br />
        &nbsp;&nbsp;} <br />
        }
        <br />
        ...
      </code>
    </div>
    You can store dictionary as a file in public folder or on any other URL path
    (for example, on dedicated S3 storage).
    <br />
    Set dictionary URL in <b>faqelize.config.js</b> file (<b>database</b>
    option).
    <br />
    <br />
    Set <b>encryptDatabase</b> option to true to encrypt dictionary while
    building (<b>npm run build</b>). CLI will ask for password to encrypt.
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      name: "Ilya",
      age: 26,
    };
  },
});
</script>

<style lang="scss" scoped>
.page {
  margin-top: 10px;
  margin-bottom: 10px;
}
.example {
  padding-left: 10px;
  border-left: 2px solid #eee;
  margin-top: 5px;
  margin-bottom: 5px;
  &:hover {
    border-color: #7967e1;
  }
  .filename {
    font-size: 12px;
    color: #999;
  }
  code {
    font-size: 14px;
    color: #333;
  }
}
</style>
