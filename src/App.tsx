import { useState } from "react";
import { useForm } from "react-hook-form";
import { AdaptiveCard } from "adaptivecards-react";
import "./App.css";

function App() {
  const { register, handleSubmit } = useForm();

  const defaultValue = {
    type: "AdaptiveCard",
    version: "1.4",
    body: [
      {
        type: "TextBlock",
        text: "AdaptiveCard サンプル",
        weight: "bolder",
        size: "large",
      },
      {
        type: "TextBlock",
        text: "Here is a ninja cat",
      },
      {
        type: "Image",
        url: "http://adaptivecards.io/content/cats/1.png",
      },
      {
        type: "RichTextBlock",
        inlines: [
          "リッチテキストブロックではいろいろなことができます：",
          {
            type: "TextRun",
            text: "サンプル",
            underline: false,
            highlight: false,
            italic: false,
            color: "default",
            size: "default",
            weight: "default",
          },
        ],
      },
    ],

    actions: [
      {
        type: "Action.OpenUrl",
        title: "ボタン",
        url: "https://adaptivecards.io",
      },
    ],
  };

  const [card, setCard] = useState(defaultValue);

  const hostConfig = {
    fontFamily: "Yu Gothic, sans-serif",
  };

  const onSubmit = (data: any) => {
    console.log(data);

    setCard({
      ...card,
      body: [
        defaultValue.body[0],
        {
          type: defaultValue.body[1].type,
          text: data.textBlock,
        },
        {
          type: defaultValue.body[2].type,
          url: data.image,
        },
        {
          type: defaultValue.body[3].type,
          inlines: [
            "リッチテキストブロックではいろいろなことができます：",
            {
              type: "TextRun",
              text: "サンプル",
              underline: data.underline,
              highlight: data.highlight,
              italic: data.italic,
              color: data.color,
              size: data.size,
              weight: data.weight,
            },
          ],
        },
      ],
    });
  };

  const resetValues = () => setCard(defaultValue);

  const stringified = JSON.stringify(card, null, 4);

  return (
    <div className="App">
      {/* AdaptiveCard */}
      <AdaptiveCard payload={card} hostConfig={hostConfig} />

      {/* 入力フォーム */}
      <form onSubmit={handleSubmit(onSubmit)} className="input-form">
        <ul>
          <li>
            <label htmlFor="text-block">テキストブロック</label>
            <input
              id="text-block"
              type="text"
              defaultValue="テキストブロック"
              {...register("textBlock")}
            />
          </li>
          <li>
            <label htmlFor="image">画像(URL)</label>
            <input
              id="image"
              type="text"
              defaultValue="http://adaptivecards.io/content/cats/2.png"
              {...register("image")}
            />
          </li>
          <li>
            <label htmlFor="underline">下線</label>
            <input id="underline" type="checkbox" {...register("underline")} />
          </li>
          <li>
            <label htmlFor="italic">斜体</label>
            <input id="italic" type="checkbox" {...register("italic")} />
          </li>
          <li>
            <label htmlFor="highlight">ハイライト</label>
            <input id="highlight" type="checkbox" {...register("highlight")} />
          </li>
          <li>
            <label htmlFor="color">色</label>
            <select id="color" {...register("color")}>
              <option value="default">default</option>
              <option value="dark">dark</option>
              <option value="light">light</option>
              <option value="accent">accent</option>
              <option value="good">good</option>
              <option value="warning">warning</option>
              <option value="attention">attention</option>
            </select>
          </li>
          <li>
            <label htmlFor="size">サイズ</label>
            <select id="size" {...register("size")}>
              <option value="default">default</option>
              <option value="small">small</option>
              <option value="medium">medium</option>
              <option value="large">large</option>
              <option value="extraLarge">extraLarge</option>
            </select>
          </li>
          <li>
            <label htmlFor="weight">ウェイト</label>
            <select id="weight" {...register("weight")}>
              <option value="default">default</option>
              <option value="lighter">lighter</option>
              <option value="bolder">bolder</option>
            </select>
          </li>
          <li>
            <input type="submit" value="反映" />
            <input type="button" value="リセット" onClick={resetValues} />
          </li>
        </ul>
      </form>

      {/* コードブロック */}
      <pre className="code">{stringified}</pre>
    </div>
  );
}

export default App;
