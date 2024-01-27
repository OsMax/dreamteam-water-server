# https://dreamteam-water-server.onrender.com
# Лайт версія документації


## TEST USER      
    "email":"testUser@gmail.com",
    "password":"test1234"


## USER
POST: [https://dreamteam-water-server.onrender.com/api/user/register](https://dreamteam-water-server.onrender.com/api/user/register)
      Запит на регістрацію користувача - очікує { email, password }

POST: [https://dreamteam-water-server.onrender.com/api/user/login](https://dreamteam-water-server.onrender.com/api/user/login)
      Запит на логінізацію користувача - очікує { email, password }

POST: [https://dreamteam-water-server.onrender.com/api/user/logout](https://dreamteam-water-server.onrender.com/api/user/logout)
      Вихід

GET:  [https://dreamteam-water-server.onrender.com/api/user/current](https://dreamteam-water-server.onrender.com/api/user/current)
      Отримання користувача за токеном

PATCH: [https://dreamteam-water-server.onrender.com/api/user/avatars](https://dreamteam-water-server.onrender.com/api/user/avatars)
       Зміна аватарки - очікує { file }

GET:  [https://dreamteam-water-server.onrender.com/api/user/verify/:verificationToken](https://dreamteam-water-server.onrender.com/api/user/verify/:verificationToken)
      Верифікація пошти

POST: [https://dreamteam-water-server.onrender.com/api/user/verify](https://dreamteam-water-server.onrender.com/api/user/verify)
      Реверифікація - очікує { email }

GET:  [https://dreamteam-water-server.onrender.com/api/user/info](https://dreamteam-water-server.onrender.com/api/user/info)
      Повертає інформацію поточного користувача

PUT:  [https://dreamteam-water-server.onrender.com/api/user/info](https://dreamteam-water-server.onrender.com/api/user/info)
      Редагування інформації про користувача - очікує {name, email, gender, password}, 
                                                  або {name, email, gender, password, newPassword}



## WATER
