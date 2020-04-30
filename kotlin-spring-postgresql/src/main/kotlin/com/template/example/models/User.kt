package com.template.example.models

import com.fasterxml.jackson.annotation.JsonProperty
import java.util.*
import javax.persistence.*

/**
 * Created by evoxmusic on 24/12/2019.
e*/
@Entity
@Table(name = "APP_USER")
data class User(@JsonProperty(access = JsonProperty.Access.READ_ONLY) @Id @GeneratedValue(strategy = GenerationType.AUTO) val id: Long? = null,
                @JsonProperty(access = JsonProperty.Access.READ_ONLY) val createdAt: Date = Date(),
                val firstName: String? = null,
                val lastName: String? = null,
                val city: String? = null) {
}
