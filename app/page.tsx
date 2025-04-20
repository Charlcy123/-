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
    "我打开文档五次，每次都坐着发呆半小时。",
    "我知道要交稿，但就是提不起一点写的欲望。",
    "我写了五段话，全都删了，因为太不像话。",
    "我不想交一个我自己都不喜欢的版本。",
    "昨天其实可以写的，但我选了躺着怀疑人生。",
    "我害怕写下去会暴露自己的无知。",
    "开头写了四个版本，都觉得不够好。",
    "我一边写一边焦虑，最后选择不写。",
    "我不想再应付式交稿了，可是灵感也没来。",
    "写着写着就开始想人生意义。",
    "我在脑子里打磨了无数次，但手指就是不愿动。",
    "每次开始写都觉得自己是个骗子。",
    "我写了，但越写越不像原来的想法。",
    "我太想证明自己了，结果哪一版都不满意。",
    "我真的有在努力，但它看不出来。",
    "我的脑子里充满想法，但没有一个敢落地。",
    "写作这件事，让我感觉自己一点价值都没有。",
    "我不是拖，我是卡住了。",
    "我甚至开始打扫房间，只为了逃避文档。",
    "我没写，是因为我还在原地对抗自己。"
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
    "我的猫在键盘上写了个新稿，我现在在修改它的版本。",
    "稿子刚写完就被一个突然出现的时空裂缝吸走了。",
    "昨晚我梦见稿子成精了，它不让我改。",
    "我的 Wi-Fi 跟稿子联手罢工了。",
    "有个反写作结界出现在我家沙发上。",
    "我的稿子跑去谈恋爱了，我尊重它的选择。",
    "我的稿子说它今天没状态。",
    "我写了一稿，但被AI嘲笑了，于是删了。",
    "文档被我家猫误删，还顺便关了电脑。",
    "我刚写出灵感，它自己飞走了。",
    "稿子刚写完就被拖进了 Windows 更新里。",
    "我本来打算写的，但"写稿.exe"崩溃了。",
    "我其实是时区搞错了，现在在上周。",
    "我的稿子在等待转世为更好的作品。",
    "我脑子里刚形成一个句子，结果它被打了个喷嚏冲散了。",
    "我的灵感目前正被高维生命研究。",
    "我的编辑器吞掉了我所有的热情。",
    "稿子昨天突然告诉我，它不想被发表。",
    "我写完了，但稿子变成了树上的落叶。",
    "今天刚好是"全球稿件消失日"，你没看到吗？"
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
    "稿子在心中缓慢生长，不适合催熟。",
    "我的文字还没醒，它还在梦里漂流。",
    "我想写的是风的声音，还没找到它。",
    "灵感就像云，来来去去，无法捕捉。",
    "我在等待合适的一个字，它现在还不肯出现。",
    "文本是一种对话，现在我还没听清对面在说什么。",
    "我正在练习一种"先不写"的写作方式。",
    "安静，也是创作的一部分。",
    "有时候，不交稿是对文字的尊重。",
    "我的写作节奏，被雨声带走了。",
    "稿子想自己慢慢来，我只是顺从它。",
    "我正在与空白页面进行深度交流。",
    "写与不写，本就如同呼吸与暂停。",
    "我的思绪在沉淀，它还没有凝成字。",
    "我把文字种在心里，它需要多点阳光。",
    "今天写不出，是因为风太柔，笔太重。",
    "语言是水，我的杯子今天太碎了。",
    "灵感是湖，我还在静静等它起波澜。",
    "如果文字不愿出现，那我就陪它沉默。",
    "我的稿子还在走路，走到它准备好了，就会来。"
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
    "我已经打好了标题，但接下来就开始做饭了。",
    "稿子就在我心里，它只是太懒了不想动。",
    "写一段删一段，我现在在玩文字俄罗斯方块。",
    "我已经写到一半，然后陷入了短视频循环。",
    "我写的不是稿子，是反复横跳的情绪。",
    "写作这事太寂寞了，我不想一个人承受。",
    "我一打开文档，手指就开始滑向淘宝。",
    "本来准备写的，结果拼图游戏赢我了。",
    "我把文档打开了，但没敢点进正文。",
    "我正在写一个更有趣的借口。",
    "我写着写着，就开始算我有几条命能重来。",
    "写稿像是挤牙膏，而我今天没有牙膏。",
    "今天的我特别有写作氛围——除了写。",
    "字都在我脑子里开派对，就是不愿排好队。",
    "今天笔电发热，我怀疑它情绪不稳。",
    "我试图写了五次，失败五次，现在在吃第六个甜甜圈。",
    "我的文档文件名是"别催了我写着呢.docx"",
    "我交不出，是因为我太有创意了——但不在这上面。",
    "我写了很多字，但都在群聊和朋友圈里。",
    "今天灵感也请了假。"
  ],
}

type ExcuseType = "real" | "ridiculous" | "zen" | "funny"

// 添加一个类型来存储打乱后的序列
type ShuffledExcuses = {
  [K in ExcuseType]: string[]
}

export default function Home() {
  const [excuse, setExcuse] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [excuseType, setExcuseType] = useState<ExcuseType>("real")
  const [typingIndex, setTypingIndex] = useState<number>(0)
  // 添加状态来存储打乱后的借口序列和当前索引
  const [shuffledExcuses, setShuffledExcuses] = useState<ShuffledExcuses>({
    real: [],
    ridiculous: [],
    zen: [],
    funny: []
  })
  const [currentIndices, setCurrentIndices] = useState<Record<ExcuseType, number>>({
    real: 0,
    ridiculous: 0,
    zen: 0,
    funny: 0
  })
  const { toast } = useToast()

  // Fisher-Yates 洗牌算法
  const shuffleArray = (array: string[]) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // 获取下一个借口
  const getNextExcuse = (type: ExcuseType) => {
    // 如果当前类别的打乱序列为空或已用完，重新打乱
    if (shuffledExcuses[type].length === 0 || currentIndices[type] >= shuffledExcuses[type].length) {
      setShuffledExcuses(prev => ({
        ...prev,
        [type]: shuffleArray(excuses[type])
      }))
      setCurrentIndices(prev => ({
        ...prev,
        [type]: 0
      }))
      return excuses[type][0] // 返回第一个元素作为初始值
    }

    // 获取当前索引的借口
    const excuse = shuffledExcuses[type][currentIndices[type]]
    
    // 更新索引
    setCurrentIndices(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }))

    return excuse
  }

  // 修改生成借口的函数
  const generateExcuse = () => {
    setIsGenerating(true)
    setExcuse("")
    setTypingIndex(0)

    const newExcuse = getNextExcuse(excuseType)

    // 开始打字机效果
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

  // 当切换类别时重置当前类别的序列
  const handleExcuseTypeChange = (value: ExcuseType) => {
    setExcuseType(value)
    if (shuffledExcuses[value].length === 0) {
      setShuffledExcuses(prev => ({
        ...prev,
        [value]: shuffleArray(excuses[value])
      }))
      setCurrentIndices(prev => ({
        ...prev,
        [value]: 0
      }))
    }
  }

  // 复制借口到剪贴板
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
          <Select value={excuseType} onValueChange={handleExcuseTypeChange}>
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
