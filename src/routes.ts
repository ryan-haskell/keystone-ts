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
        title: 'KeystoneJS',
        subtitle: 'Maybe it isn\'t so awful...'
      }
    }))
}

module.exports = (app: Application) : void => {
  app.get('/', pages.home)
}
