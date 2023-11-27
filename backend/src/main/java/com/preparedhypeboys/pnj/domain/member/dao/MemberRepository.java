package com.preparedhypeboys.pnj.domain.member.dao;

import com.preparedhypeboys.pnj.domain.member.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByNameAndEmail(String name, String email);
}
