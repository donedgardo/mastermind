import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { Mesh } from 'three'

function Guess(props) {
  const mesh = useRef<Mesh>()

  return (
    <mesh
    {...props}
  ref={mesh}
  scale={[0.1, 0.1, 0.1]}
  // onClick={(event) => setActive(!active)}
  // onPointerOver={(event) => setHover(true)}
  // onPointerOut={(event) => setHover(false)}>
    >
  <sphereBufferGeometry />
  <meshStandardMaterial color={'black'} />
</mesh>
)

}

function Guesses(props) {
  return (
  <mesh
    {...props}
    scale={[1, 1, 1]} >
      <Guess position={[-.4, 0, 0]} />
      <Guess position={[-.2, 0, 0]} />
      <Guess position={[0, 0, 0]} />
      <Guess position={[.2, 0, 0]} />
    </mesh>
  )
}

function Board(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh>()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={[1, 1, 1]}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxBufferGeometry args={[1, 2.5, 0.25]} />
      <meshStandardMaterial color={'red'} />
      <Guesses position={[0.1, -1, .14]} />
      <Guesses position={[0.1, -0.7, .14]} />
      <Guesses position={[0.1, -0.4, .14]} />
      <Guesses position={[0.1, -0.1, .14]} />
      <Guesses position={[0.1, .2, .14]} />
      <Guesses position={[0.1, .5, .14]} />
      <Guesses position={[0.1, .8, .14]} />
      <Guesses position={[0.1, 1.1, .14]} />
    </mesh>
  )
}

export default () => (
  <Canvas>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Board position={[-1.2, 0, 0]} />
    <Board position={[1.2, 0, 0]} />
  </Canvas>)
