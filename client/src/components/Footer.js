import React from 'react'

//icons
import { AiFillLinkedin } from 'react-icons/ai';
import { AiFillGithub } from 'react-icons/ai';
import { AiOutlineInstagram } from 'react-icons/ai';
import { BsMedium } from 'react-icons/bs'

export default function Footer() {

  return (
    <footer>
      <div className="container-footer">
        <div className="footer-row">
          <div className='footer-col'>
            <h2>BİZİ TAKİP EDİN.</h2>
            <div className='social-accounts'>
              <a href='https://www.linkedin.com/in/kemalsezgen/'><AiFillLinkedin /></a>
              <a href='https://www.instagram.com/kemalsezgenn/'><AiOutlineInstagram /></a>
              <a href='https://github.com/kemalsezgen'><AiFillGithub /></a>
              <a href='https://medium.com/@kemalsezgen1'><BsMedium /></a>
            </div>
          </div>
          <div className='footer-col'>
            <h2>ABOUT US</h2>
            <a href='/about'>Biz kimiz?</a>
            <a href='/trainers'>Trainers</a>
            <a href='/'>Blog yazıları</a>
            <a href='/'>Kampanyalar</a>
          </div>
          <div className='footer-col'>
            <h2>HİZMETLERİMİZ</h2>
            <a href='/'>Spor salonu üyeliği</a>
            <a href='/'>Kişiye özel eğitmen</a>
            <a href='/'>Kişiye özel programlar</a>
            <a href='/'>Eğitmenlerle görüntülü konuşma fırsatı</a>
          </div>
        </div>
        <div className='copyright'>
          <p>&copy; 2023 Best GYM. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}
