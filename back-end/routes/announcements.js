var express = require('express')
var router = express.Router()

let fakeAnnouncements = [
  {id: 2, userId: 2, title: "Test Closure", isApproved: false},
  {id: 3, userId: 2, title: "Test Closure 2", isApproved: true},
]

/* GET announcements listing. */
router.get('/', function (req, res, next) {
  res.send(fakeAnnouncements)
})

/* GET announcement listing. */
router.get('/:id', function (req, res, next) {
  const id = req.params.id

  const announcement = fakeAnnouncements.filter(announcement => {
    return announcement.id === id
  })[0]

  res.send(announcement ? announcement : "Announcement Not Found")

})

/*POST new announcement*/
router.post('/', function (req, res, next) {
  const newAnnouncement = req.body
  const nextId = fakeAnnouncements[fakeAnnouncements.length - 1].id + 1 // When we set up a database we'll just use the autoincrement

  fakeAnnouncements.push({...newAnnouncement, id: nextId})
  res.send().status(200)
})

/*POST new announcement*/
router.post('/:id', function (req, res, next) {
  const newAnnouncement = req.body
  const id = req.params.id

  fakeAnnouncements = fakeAnnouncements.map(announcement => {
    console.log(id)
    console.log(announcement.id)
    if(parseInt(announcement.id) === parseInt(id)){
      return newAnnouncement
    } else {
      return announcement
    }
  })
  res.send().status(200)
})

module.exports = router
