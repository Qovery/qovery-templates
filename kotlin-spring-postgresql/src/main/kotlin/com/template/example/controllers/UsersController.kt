package com.template.example.controllers

import com.template.example.models.User
import com.template.example.repositories.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.util.*

/**
 * Created by evoxmusic on 25/12/2019.
 */
@RestController
@RequestMapping("/users")
class UsersController {

    @Autowired
    private lateinit var userRepository: UserRepository

    @GetMapping
    fun list(): Iterable<User> = userRepository.findAll()

    @PostMapping
    fun create(@RequestBody user: User): User = userRepository.save(user)

    @DeleteMapping(path = ["{id}"])
    fun delete(@PathVariable id: Long) = userRepository.deleteById(id)

    @PutMapping(path = ["{id}"])
    fun update(@PathVariable id: Long, @RequestBody user: User): Optional<User> = userRepository.findById(id).map {
        it.copy(
                firstName = user.firstName,
                lastName = user.lastName,
                city = user.city
        )
    }.map { userRepository.save(it) }

}
