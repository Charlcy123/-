"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Excuse categories and their content
const excuses = {
  real: [
    "我怕我写得不好，所以干脆没写。",
    "我脑子写了三遍，但手一动就全忘了。",
    "每次打开文档就开始自我否定。",
    "我在想一个更好的开头，想了一周。",
    "写了两句，然后开始怀疑人生。",
    "我太想写好了，结果一点都没写。",
    "灵感来过一次，但我当时在洗碗。",
    "我想等自己变厉害再动笔。",
    "我的完美主义正在阻止我进度条移动。",
    "我写了一段特别棒的，但忘保存了。",
    "抱歉，我昨晚写到凌晨四点，但它现在像垃圾，我不敢交。",
    "我写了一点，但发现完全不是我想说的那个方向，又从头来。",
    "这段时间脑袋像堵住了，我不想交一个我都不相信的版本。",
    "快好了，我只是需要再对抗一下自己。",
    "我想过凑合交，但我真的不想对不起这个稿子。",
    "编辑你信我一次，我明早一定给你。",
    "我有在写，只是写得很慢，而且很怕你不喜欢。",
    "今天真的坐在桌前了，但脑子没上线。",
    "我知道我在拖，但我真的在努力了。",
  ],
  ridiculous: [
    "稿子昨天变成了 PNG 图，现在我在OCR。",
    "有只猫坐在键盘上按了 Command+Z。",
    "我的文档昨天和我分手了。",
    "电热毯把我困住了，我写不了。",
    "昨天写了一夜，但今天醒来发现是梦。",
    "稿子进了黑洞，我正在找它回来。",
    "我的稿子开始反抗我，不愿被写出来。",
    "我在和一个逗号吵架。",
    "我打了个喷嚏，把整篇稿子关了。",
    "我的猫把稿子当成了午餐。",
    "外星人借走了我的灵感，说下周归还。",
    "我的稿子太好了，被时空管理局没收了，说会影响宇宙平衡。",
    "我的文字太锋利，把屏幕划破了，正在等修理。",
  ],
  zen: [
    "稿子需要时间发酵，像红酒。",
    "我在等待一种无可言说的灵感。",
    "我正以一种更深刻的方式与空白对话。",
    "我的灵感还在旅途中。",
    "我写的是内心，而不是文本。",
    "不写也是写，延迟是节奏的一部分。",
    "我不是不写，我是在酝酿。",
    "我不拖稿，我是时间艺术家。",
    "写作这件事，是稿子决定的。",
    "我在脑子里已经写完了，只是手没动。",
    "文字需要时间沉淀，就像好酒需要时间发酵。",
    "真正的稿子不在文档里，而在心里。",
    "不写，才是最好的写作。",
    "稿子已经存在于宇宙中，我只是还没找到它的确切位置。",
  ],
  funny: [
    "我写完了开头，现在在循环润色那三行。",
    "我开始写了，但被表格吓退了。",
    "我稿子写了 10%，情绪写了 90%。",
    "我正在等待我的替身人格完成这篇稿子。",
    "我的创作灵感去度假了，没留下联系方式。",
    "我在等一个特定的月相来激发我的创作能力。",
    "我的稿子太有趣了，我自己笑到无法继续写。",
    "我的创意太多，选择困难症犯了，所以什么都没写。",
  ],
}

type ExcuseType = "real" | "ridiculous" | "zen" | "funny"

export default function Home() {
  const [excuse, setExcuse] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [excuseType, setExcuseType] = useState<ExcuseType>("real")
  const [typingIndex, setTypingIndex] = useState<number>(0)
  const { toast } = useToast()

  // Generate a random excuse
  const generateExcuse = () => {
    setIsGenerating(true)
    setExcuse("")
    setTypingIndex(0)

    const selectedCategory = excuses[excuseType]
    const randomIndex = Math.floor(Math.random() * selectedCategory.length)
    const newExcuse = selectedCategory[randomIndex]

    // Start the typewriter effect
    const timer = setInterval(() => {
      setTypingIndex((prev) => {
        if (prev < newExcuse.length) {
          setExcuse(newExcuse.substring(0, prev + 1))
          return prev + 1
        } else {
          clearInterval(timer)
          setIsGenerating(false)
          return prev
        }
      })
    }, 50)
  }

  // Copy excuse to clipboard
  const copyExcuse = () => {
    if (excuse) {
      navigator.clipboard.writeText(excuse)
      toast({
        title: "已复制到剪贴板",
        description: "可以发给编辑了 😉",
        duration: 2000,
      })
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 md:p-24 bg-white text-black">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">我为什么还没交稿？</h1>

      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col space-y-4">
          <Label htmlFor="excuse-type">选择借口类型</Label>
          <Select value={excuseType} onValueChange={(value) => setExcuseType(value as ExcuseType)}>
            <SelectTrigger id="excuse-type" className="w-full">
              <SelectValue placeholder="选择借口类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="real">真实</SelectItem>
              <SelectItem value="ridiculous">离谱</SelectItem>
              <SelectItem value="zen">禅系</SelectItem>
              <SelectItem value="funny">搞笑</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          className="w-full h-14 text-lg font-medium transition-all hover:scale-105"
          onClick={generateExcuse}
          disabled={isGenerating}
        >
          生成拖稿借口
        </Button>

        {excuse && (
          <Card className="mt-8 overflow-hidden shadow-lg border-2">
            <CardContent className="p-6">
              <p className="text-xl leading-relaxed min-h-[80px]">{excuse}</p>
              <Button variant="outline" size="sm" className="mt-4 flex items-center gap-2" onClick={copyExcuse}>
                <Copy className="h-4 w-4" />
                复制借口
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
