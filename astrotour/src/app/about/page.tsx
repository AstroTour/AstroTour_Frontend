import React from 'react'

function page() {
  return (
    <div className='bg-transparent p-5 m-10 mt-5 max-w-full'>
      <div className='text-white rounded-xl bg-black/60 shadow-2xl p-10 max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto'>
        <p className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-white to-white'>
          Bemutatkozás:</p>
        <p className='break-words p-2 text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-white'>
          Üdvözlünk az AstroTour világában!
        </p>

        <p className='break-words'>
          Küldetésünk, hogy elhozzuk számodra a csillagok varázsát és felejthetetlen élményeket nyújtsunk a világegyetem csodáival kapcsolatban.
          Szenvedélyünk az űrkutatás, az éjszakai égbolt és a felfedezés – ezért hoztuk létre az AstroTourt, hogy bárki számára elérhetővé tegyük az univerzum csodáinak felfedezését. Legyen szó vezetett csillagászati túrákról, exkluzív planetáriumi élményekről vagy teleszkópos megfigyelésekről, nálunk minden csillagbarát megtalálja a helyét.
          Csapatunk tapasztalt csillagászokból, túravezetőkből és űrszerelmeseiből áll, akik minden alkalommal lenyűgöző betekintést nyújtanak a világűr rejtelmeibe. Célunk, hogy minél többen megtapasztalják azt a csodát, amit az égbolt nyújt, és hogy egy éjszaka alatt elkalauzoljunk mindenkit a végtelenbe – akár saját szemmel, akár a legmodernebb technológiák segítségével.
        </p>

        <p className='break-words p-2 text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-700 via-blue-700 to-purple-600'>
          Csatlakozz hozzánk, és fedezd fel az univerzumot úgy, ahogy még soha!
        </p>
      </div>
    </div>
  )
}

export default page