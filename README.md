# Blockchain Smart-Contract

The Blockchain technology can be used in applications beyond cryptocurrency. In this lab, we explore the Blockchain application for logging the operation trace of a remote file-storage service. This features a common use of the Blockchain, that is, making the data about a third-party transparent to invite trusts. The learning objective of this lab is for students to design and implement a simple service for secure distributed file system (SDFS) and use the Blockchain technology to log the service related information. The target system consists of a client supporting multiple file-system users and a server storing a file.

- Supply Chain Transaction System and Contract understanding

In commerce, supply chain management (SCM), the management of the flow of goods and services, involves the movement and storage of raw materials, of work-in-process inventory, and of finished goods from point of origin to point of consumption. Supply-chain management has been defined as the "design, planning, execution, control, and monitoring of supply chain activities with the objective of creating net value, building a competitive infrastructure, leveraging worldwide logistics, synchronizing supply with demand and measuring performance globally."

The following describes the protocol of a typical "supply Blockchain":

buyer first deposits her payments (e.g., $100) to the smart contract ( Deposit(100)).
supplier gets notified of buyer's deposit.
supplier starts to ship the product to the buyer.
when the good reaches the destination, a transaction is generated (e.g., agreed by both buyer and supplier) and is sent to the Blockchain. This triggers the payment to execute (DeliveredAndTransfer()).

- Escrow Service and Contract understanding

An escrow protocol is a three-party protocol among a buyer, a seller and an explicit escrow service. At the beginning of the transaction, the buyer makes a security deposit to the escrow service. This is done by the buyer sending a transaction to an address on which the escrow smart contract runs. After the transaction, if both seller and buyer agree, the escrow smart contract will make the payment to the seller. If there is a dispute, meaning either seller or buyer disagrees, the smart contract will withhold the payment from sending to the seller.

