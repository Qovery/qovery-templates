package com.template.example.controllers

import com.template.example.repositories.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Created by evoxmusic on 24/12/2019.
 */
@RestController
@RequestMapping("/")
class RootController {

    @Autowired
    private lateinit var userRepository: UserRepository

    @GetMapping
    fun list() = mapOf("users" to userRepository.findAll())

}
