import { Request, Response, Application } from 'express'
import { join } from 'path'

const locals = (obj : object) : object => ({
  ...obj,
  basedir: join(__dirname, 'pages')
})

const pages = {
  home: (_req : Request, res : Response) : any =>
    res.render('home', locals({
      page: {
        meta: {
          title: 'KeystoneTS',
          description: 'I bet you love life.'
        },
        hero: {
          title: 'KeystoneJS',
          subtitle: 'But with Typescript tho...',
          buttonLabel: 'Tell me more.'
        }
      }
    }))
}

module.exports = (app: Application) : void => {
  app.get('/', pages.home)
}
