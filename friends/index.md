<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/19746684',
    name: 'Gekka Saori',
    title: 'Wife',
    links: [
      { icon: 'github', link: 'https://github.com/GekkaSaori' },
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/54884471',
    name: 'Noa Virellia',
    title: '是最近认识的一位很可爱的孩子w',
    links: [
        { icon: 'github', link: 'https://github.com/AsterisMono'},
        { icon: { svg: '🔗' }, link: 'https://noise.amono.me'}
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/18461360',
    name: '凌莞~(=^▽^=)',
    title: '曾经一起在MtF.wiki共事，现在在使用她开发的MuNet',
    links: [
        { icon: 'github', link: 'https://github.com/clansty'},
        { icon: { svg: '🔗' }, link: 'https://nyac.at'}
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/9004058',
    name: 'MikuNotFoundExpection',
    title: '好耶！是萌铁铁！',
    links: [
        { icon: 'github', link: 'https://github.com/Officeyutong'}
    ]
  },
    {
    avatar: 'https://avatars.githubusercontent.com/u/43064781',
    name: 'Coelacanthus',
    title: '哇！是C10s大佬！',
    links: [
        { icon: 'github', link: 'https://github.com/CoelacanthusHex'},
        { icon: { svg: '🔗' }, link: 'https://blog.coelacanthus.moe'}
    ]
  },
    {
    avatar: 'https://avatars.githubusercontent.com/u/11341955',
    name: 'Menci',
    title: 'Menci Meow Cat owo',
    links: [
        { icon: 'github', link: 'https://github.com/Menci'},
        { icon: { svg: '🔗' }, link: 'https://men.ci'}
    ]
  },
    {
    avatar: 'https://avatars.githubusercontent.com/u/26759054',
    name: 'saeziae',
    title: '山前大姐姐！',
    links: [
        { icon: 'github', link: 'https://github.com/saeziae'},
        { icon: { svg: '🔗' }, link: 'https://estela.moe'}
    ]
  },
]
</script>

# 友情链接

这是我的好朋友们，虽然很少，但也显得弥足珍贵。

（除了GekkaSaori，其他朋友的排名不分先后）

<VPTeamMembers size="small" :members />